import { Request, Response } from 'express';

import { AppUninstalledPayload, RiseactConfig, StorageAdapters } from '../types';
import { deleteRefreshLock, isWebhookProcessed, markWebhookProcessed } from '../utils/lruCache';
import safeAsyncHandler from '../utils/safeAsyncHandler';
import { verifyRequestSignature } from './signature';

/** Fixed path Riseact calls when the app is uninstalled from an organization (or the organization is deleted) */
export const APP_UNINSTALLED_PATH = '/webhooks/app-uninstalled';

const APP_UNINSTALLED_EVENT = 'app.uninstalled';

/** Runs the onUninstall hook, then drops the organization's credentials.
 *
 * Answers 2xx only once both succeeded: on any other answer Riseact retries the call.
 */
const appUninstalledHandler = safeAsyncHandler(async (req: Request, res: Response) => {
  const config: RiseactConfig = req.riseact.config;
  const storage: StorageAdapters = req.riseact.storage;

  if (!verifyRequestSignature(req)) {
    console.warn('[RISEACT-SDK] Rejected app uninstall call: missing or invalid signature');
    return res.sendStatus(401);
  }

  const payload = req.body as AppUninstalledPayload;
  const domain = payload?.organization;

  if (payload?.event !== APP_UNINSTALLED_EVENT || !domain || payload.object?.client_id !== config.auth.clientId) {
    console.error('[RISEACT-SDK] Malformed app uninstall call', { event: payload?.event, organization: domain });
    return res.sendStatus(400);
  }

  if (isWebhookProcessed(payload.idempotency_key)) {
    return res.sendStatus(200);
  }

  console.info('[RISEACT-SDK] App uninstalled from organization', domain, `(${payload.object.reason})`);

  try {
    await config.auth.onUninstall?.({
      domain,
      reason: payload.object.reason,
      uninstalledAt: new Date(payload.object.uninstalled_at),
    });

    // The hook may have deleted the credentials along with the organization: some adapters
    // throw when asked to remove what is no longer there.
    if (await storage.getCredentialsByOrganizationDomain(domain)) {
      await storage.removeCredentials(domain);
    }
  } catch (e) {
    console.error('[RISEACT-SDK] App uninstall failed for organization', domain, '- Riseact will retry the call', e);
    return res.sendStatus(500);
  }

  deleteRefreshLock(domain);
  markWebhookProcessed(payload.idempotency_key);

  return res.sendStatus(200);
});

export default appUninstalledHandler;
