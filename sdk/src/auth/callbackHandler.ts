import { Request, RequestHandler, Response } from 'express';
import { v4 } from 'uuid';

import { OAUTH_REDIRECT_URI } from '../config/consts';
import { RiseactConfig, StorageAdapters } from '../types';
import safeAsyncHandler from '../utils/safeAsyncHandler';
import urlJoin from '../utils/urlJoin';
import { getOAuthClient } from './authUtils';
import { dangerouslyCreateGqlClientByAccessToken } from '../network/createGqlClient';
import { popPkce, saveSid } from '../utils/lruCache';

const oauthCallbackHandler: RequestHandler = safeAsyncHandler(async (req: Request, res: Response) => {
  const config: RiseactConfig = req.riseact.config;
  const storage: StorageAdapters = req.riseact.storage;

  const redirectUri = urlJoin(config.network.appPublicUrl, OAUTH_REDIRECT_URI);
  const client = await getOAuthClient(config);
  const params = client.callbackParams(req);

  const state = params.state;

  if (!state) {
    console.error('[RISEACT-SDK] No state provided in OAuth callback request');
    return res.sendStatus(400);
  }

  const storedState = popPkce(state);

  if (!storedState) {
    console.error('[RISEACT-SDK] No code verifier found for the provided state. It might have expired (TTL 10 minutes).');
    return res.status(400).send('Code verifier not found or expired');
  }

  if (!storedState.codeVerifier) {
    console.error('[RISEACT-SDK] No code provided in OAuth callback request');
    return res.sendStatus(400);
  }

  const tokenSet = await client
    .callback(redirectUri, params, {
      code_verifier: storedState.codeVerifier,
      state,
    })
    .catch((e) => {
      console.error('[RISEACT-SDK] Error during OAuth callback with Riseact accounts server. Details below:', e, {
        callbackParams: params,
        codeVerifier: storedState.codeVerifier,
      });
    });

  if (!tokenSet) {
    return res.sendStatus(403);
  }

  const refreshToken = tokenSet.refresh_token;
  const accessToken = tokenSet.access_token;
  const expiresInSeconds = tokenSet.expires_in;

  if (!refreshToken || !accessToken || !expiresInSeconds) {
    console.error('[RISEACT-SDK] No refresh_token, access_token or expires_in provided from authorization server. Details below:', {
      refreshToken,
      accessToken,
      expiresInSeconds,
      riseactConfig: config,
      callbackParams: params,
      codeVerifierCookie: storedState,
      tokenSet,
    });
    return res.sendStatus(500);
  }

  const expiresDateUTC = new Date(Date.now() + expiresInSeconds * 1000);

  const newClientToken = 'ct_' + v4();

  // check if the organization is already stored in the storage
  const oldCredentials = await storage.getCredentialsByOrganizationDomain(storedState.organizationDomain);

  if (!oldCredentials?.organizationDomain && config?.auth?.onInstall) {
    // It's supposed to be a new fresh token
    const gqlClient = await dangerouslyCreateGqlClientByAccessToken(accessToken);
    config?.auth?.onInstall?.({
      domain: storedState.organizationDomain,
      credentials: {
        organizationDomain: storedState.organizationDomain,
        accessToken,
        refreshToken,
        expiresInSeconds,
        expiresDateUTC,
        clientToken: newClientToken,
      },
      gqlClient,
    });
  }

  const clientToken = oldCredentials?.clientToken || newClientToken;

  await storage.setCredentials({
    organizationDomain: storedState.organizationDomain,
    refreshToken,
    accessToken,
    expiresDateUTC,
    expiresInSeconds,
    clientToken,
  });

  const sid = 'sid_' + v4();
  saveSid(sid, { organizationDomain: storedState.organizationDomain, clientToken });

  res.redirect('/auth/get-token#sid=' + sid);
});

export default oauthCallbackHandler;
