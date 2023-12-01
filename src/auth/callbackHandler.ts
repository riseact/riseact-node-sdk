import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Request, RequestHandler, Response } from 'express';
import { v4 } from 'uuid';

import { COOKIE_CODE_VERIFIER, COOKIE_REFRESH_TOKEN, TOKEN_COOKIE_NAME } from '../config/consts';
import { createGqlClientByAccessToken } from '../network/createGqlClientByAccessToken';
import { RiseactConfig, StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';
import { getOAuthClient } from './oauth';

const ORGANIZATION_QUERY = gql`
  query Organization {
    organization {
      id
    }
  }
`;

const initCallbackHandler = (config: RiseactConfig, storage: StorageDriver): RequestHandler => {
  const oauthCallbackHandler: RequestHandler = async (req: Request, res: Response) => {
    const codeVerifier = req.cookies?.[COOKIE_CODE_VERIFIER];

    if (!codeVerifier) {
      console.error('No code verifier found in client cookies');
      return res.sendStatus(401);
    }

    if (!config.auth.redirectUri) {
      config.auth.redirectUri = urlJoin(`${req.headers.host?.includes('ngrok') ? 'https' : req.protocol}://`, req.headers.host, '/oauth/callback');
    }

    const client = await getOAuthClient(config);

    const params = client.callbackParams(req);

    const tokenSet = await client.callback(config.auth.redirectUri, params, {
      code_verifier: codeVerifier,
    });

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
        codeVerifier: codeVerifier,
        tokenSet,
      });
      return res.sendStatus(500);
    }

    const expiresDateUTC = new Date(Date.now() + expiresInSeconds * 1000);

    const gqlClient = createGqlClientByAccessToken({ accessToken, coreHost: config.hosts!.core });

    let orgRes: ApolloQueryResult<{ organization: { id: number } }>;
    try {
      orgRes = await gqlClient.query({
        query: ORGANIZATION_QUERY,
      });
    } catch (e) {
      console.error('Error during GraphQL request to Riseact. Details below', e, {
        refreshToken,
        accessToken,
        expiresInSeconds,
        riseactConfig: config,
        callbackParams: params,
        codeVerifier: codeVerifier,
        tokenSet,
      });
      return res.sendStatus(500);
    }

    const organizationId = orgRes.data.organization.id;

    if (!organizationId) {
      console.error('No organization ID provided from Riseact. Details below', {
        refreshToken,
        accessToken,
        expiresInSeconds,
        riseactConfig: config,
        callbackParams: params,
        codeVerifier: codeVerifier,
        tokenSet,
      });
      return res.sendStatus(500);
    }

    const org = await storage.getCredentialsByOrganizationId(organizationId);
    const clientToken = org?.clientToken || v4();

    if (!org) {
      await storage.saveCredentials({
        refreshToken,
        accessToken,
        organizationId,
        clientToken,
        expiresDateUTC,
        expiresInSeconds,
      });

      if (config.auth.onInstall) {
        await config.auth.onInstall(organizationId, clientToken);
      }
    } else {
      if (config.auth.onLogin) {
        await config.auth.onLogin(organizationId, clientToken);
      }
    }

    res.clearCookie(COOKIE_REFRESH_TOKEN);
    res.clearCookie(COOKIE_CODE_VERIFIER);

    res.cookie(TOKEN_COOKIE_NAME, clientToken, { path: '/', secure: true, sameSite: 'none' /* , httpOnly: true */ });

    res.redirect('/');
  };

  return oauthCallbackHandler;
};

export default initCallbackHandler;
