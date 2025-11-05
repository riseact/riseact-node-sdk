import { BaseClient, Issuer } from 'openid-client';

import { OAuthCredentials, RiseactConfig, StorageAdapters } from '../types';
import urlJoin from '../utils/urlJoin';
import { OAUTH_REDIRECT_URI, RISEACT_ACCOUNTS_URL } from '../config/consts';
import { deleteRefreshLock, getRefreshLockState, updateRefreshLock } from '../utils/lruCache';

export async function getOAuthClient(config: RiseactConfig): Promise<BaseClient> {
  let riseactIssuer: Issuer<BaseClient>;

  try {
    riseactIssuer = await Issuer.discover(urlJoin(RISEACT_ACCOUNTS_URL, '/oauth/.well-known/openid-configuration/'));
  } catch (error) {
    console.error(
      `[RISEACT-SDK] Error during OAuth issuer discovery. Call to ${urlJoin(RISEACT_ACCOUNTS_URL, '/oauth/.well-known/openid-configuration/')} failed. Details below:`,
      error,
    );
    throw Error('Could not discover OAuth issuer from Riseact accounts server');
  }

  if (!config.auth.clientId || !config.auth.clientSecret || !config.network.appPublicUrl) {
    console.error('[RISEACT-SDK] OAuth client ID, client secret or app public URL not provided in RiseactConfig');
    throw Error('OAuth client not valid. Check OAuth credentials');
  }

  const client = new riseactIssuer.Client({
    client_id: config.auth.clientId,
    client_secret: config.auth.clientSecret,
    redirect_uris: [urlJoin(config.network.appPublicUrl, OAUTH_REDIRECT_URI)],
    response_types: ['code'],
  });

  return client;
}

const waitForRefreshCompletion = async (organizationDomain: string, storage: StorageAdapters): Promise<OAuthCredentials> => {
  /* 
    The polling loop keeps the caller idle until the refresh lock switches
    to “completed”. Once that happens we fetch credentials from storage
    to serve the updated values to the waiting caller.
  */
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const latestLockState = getRefreshLockState(organizationDomain);

    if (!latestLockState) {
      throw new Error(`[RISEACT-SDK] Refresh lock for ${organizationDomain} disappeared while waiting`);
    }

    if (latestLockState.status === 'completed') {
      const updatedCredentials = await storage.getCredentialsByOrganizationDomain(organizationDomain);
      if (!updatedCredentials) {
        throw new Error(`[RISEACT-SDK] Missing credentials in storage after refresh for ${organizationDomain}`);
      }
      return updatedCredentials;
    }
  }
};

/**
 * Concurrent refresh handling flow:
 *
 * ```
 * renewToken(oldCredentials):
 *   if cache[org].status === 'pending':
 *     loop:
 *       wait 1s
 *       state = cache[org]
 *       if !state -> throw (refresh failed)
 *       if state === 'completed':
 *         return storage.getCredentialsByOrganizationDomain(org)
 *
 *   cache[org] = 'pending'
 *   try:
 *     call Riseact with refresh_token, persist new credentials
 *     cache[org] = 'completed'
 *     return new credentials
 *   catch error:
 *     cache.remove(org)
 *     rethrow
 * ```
 *
 * Every organizationDomain therefore has a single “active” refresh call.
 * Later callers poll the cache until the first call completes and then
 * reuse the credentials already written to storage.
 */
export async function renewToken(
  clientId: string,
  clientSecret: string,
  oldCredentials: OAuthCredentials,
  storage: StorageAdapters,
): Promise<OAuthCredentials> {
  const organizationDomain = oldCredentials.organizationDomain;
  const currentLockState = getRefreshLockState(organizationDomain);

  if (currentLockState?.status === 'pending') {
    return waitForRefreshCompletion(organizationDomain, storage);
  }

  updateRefreshLock(organizationDomain, 'pending');

  const urlFormDataObj = {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: oldCredentials.refreshToken,
  };

  try {
    const urlFormDataArr: Array<string> = [];
    for (const property in urlFormDataObj) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(urlFormDataObj[property as keyof typeof urlFormDataObj]);
      urlFormDataArr.push(encodedKey + '=' + encodedValue);
    }
    const formBodyStr = urlFormDataArr.join('&');

    // Call auth server to refresh token
    const oauthRes = await fetch(urlJoin(RISEACT_ACCOUNTS_URL, '/oauth/token/'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBodyStr,
    });
    if (!oauthRes.ok) {
      throw new Error(`Failed to refresh token for org: ${oldCredentials.organizationDomain} - ${oauthRes.status} ${oauthRes.statusText}`);
    }

    // Check if response is ok
    const oauthResData = (await oauthRes.json()) as { access_token: string; refresh_token: string; expires_in: number };
    if (!oauthResData?.access_token || !oauthResData?.refresh_token) {
      throw new Error('Could not refresh token. Response from riseact did not contain access_token or refresh_token');
    }

    // Save new credentials
    const newCredentials: OAuthCredentials = {
      clientToken: oldCredentials.clientToken,
      organizationDomain: oldCredentials.organizationDomain,
      accessToken: oauthResData.access_token,
      refreshToken: oauthResData.refresh_token,
      expiresInSeconds: oauthResData.expires_in,
      expiresDateUTC: new Date(Date.now() + oauthResData.expires_in * 1000),
    };

    await storage.setCredentials(newCredentials);
    updateRefreshLock(organizationDomain, 'completed');
    return newCredentials;
  } catch (error) {
    deleteRefreshLock(organizationDomain);
    throw error;
  }
}
