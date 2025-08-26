import { Request, RequestHandler, Response } from 'express';
import { v4 } from 'uuid';

import { COOKIE_CODE_VERIFIER, COOKIE_CLIENT_TOKEN, OAUTH_REDIRECT_URI } from '../config/consts';
import { ClientTokenCookie, CodeVerifierCookie, RiseactConfig, StorageAdapters } from '../types';
import safeAsyncHandler from '../utils/safeAsyncHandler';
import urlJoin from '../utils/urlJoin';
import { getOAuthClient } from './oauth';
import { dangerouslyCreateGqlClientByAccessToken } from '../network/createGqlClient';

const initCallbackHandler = (config: RiseactConfig, storage: StorageAdapters): RequestHandler => {
  const oauthCallbackHandler: RequestHandler = safeAsyncHandler(async (req: Request, res: Response) => {
    const codeVerifierCookieString = req.cookies?.[COOKIE_CODE_VERIFIER];

    if (!codeVerifierCookieString) {
      console.error('No code verifier found in client cookies');
      return res.sendStatus(401);
    }

    const codeVerifierCookie: CodeVerifierCookie = JSON.parse(codeVerifierCookieString);
    const redirectUri = urlJoin(config.network.appPublicUrl, OAUTH_REDIRECT_URI);
    const client = await getOAuthClient(config);
    const params = client.callbackParams(req);

    const tokenSet = await client
      .callback(redirectUri, params, {
        code_verifier: codeVerifierCookie.code,
      })
      .catch((e) => {
        console.error('Error during OAuth callback with Riseact accounts server. Details below:', e, {
          riseactConfig: config,
          callbackParams: params,
          codeVerifier: codeVerifierCookie.code,
        });
      });

    if (!tokenSet) {
      return res.sendStatus(403);
    }

    const refreshToken = tokenSet.refresh_token;
    const accessToken = tokenSet.access_token;
    const expiresInSeconds = tokenSet.expires_in;

    if (!refreshToken || !accessToken || !expiresInSeconds) {
      console.error('No refresh_token, access_token or expires_in provided from authorization server. Details below:', {
        refreshToken,
        accessToken,
        expiresInSeconds,
        riseactConfig: config,
        callbackParams: params,
        codeVerifierCookie: codeVerifierCookie,
        tokenSet,
      });
      return res.sendStatus(500);
    }

    const expiresDateUTC = new Date(Date.now() + expiresInSeconds * 1000);

    const newClientToken = v4();

    // check if the organization is already stored in the storage
    const oldCredentials = await storage.getCredentialsByOrganizationDomain(codeVerifierCookie.organizationDomain);

    await storage.setCredentials({
      organizationDomain: codeVerifierCookie.organizationDomain,
      refreshToken,
      accessToken,
      expiresDateUTC,
      expiresInSeconds,
      clientToken: oldCredentials?.clientToken || newClientToken,
    });

    if (!oldCredentials?.organizationDomain && config?.auth?.onInstall) {
      // It's supposed to be a new fresh token
      const gqlClient = await dangerouslyCreateGqlClientByAccessToken(accessToken);
      config?.auth?.onInstall?.({
        domain: codeVerifierCookie.organizationDomain,
        credentials: {
          organizationDomain: codeVerifierCookie.organizationDomain,
          accessToken,
          refreshToken,
          expiresInSeconds,
          expiresDateUTC,
          clientToken: newClientToken,
        },
        gqlClient,
      });
    }

    const authTokenCookie: ClientTokenCookie = {
      token: oldCredentials?.clientToken || newClientToken,
      organizationDomain: codeVerifierCookie.organizationDomain,
    };

    const authTokenCookieString = JSON.stringify(authTokenCookie);

    res.clearCookie(COOKIE_CODE_VERIFIER, { path: '/', sameSite: 'none', secure: true });
    res.cookie(COOKIE_CLIENT_TOKEN, authTokenCookieString, { path: '/', secure: true, sameSite: 'none', httpOnly: true });
    res.redirect('/');
  });

  return oauthCallbackHandler;
};

export default initCallbackHandler;
