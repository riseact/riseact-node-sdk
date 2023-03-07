import { ApolloQueryResult, gql } from '@apollo/client/core';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { v4 } from 'uuid';

import { COOKIE_CODE_VERIFIER, COOKIE_REFRESH_TOKEN, TOKEN_COOKIE_NAME } from '../config/consts';
import { createGqlClientUsingAccessToken } from '../network/createGqlClient';
import { AuthConfig, RiseactAuth, StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';
import { getAuthorizationData, getOAuthClient } from './oauth';

const ORGANIZATION_QUERY = gql`
  query Organization {
    organization {
      id
    }
  }
`;

export function initAuth(config: AuthConfig, storage: StorageDriver): RiseactAuth {
  const oauthAuthorizeHandler: RequestHandler = async (req: Request, res: Response) => {
    if (!config.redirectUri) {
      config.redirectUri = urlJoin(`${req.protocol}://`, req.headers.host, '/oauth/callback');
    }
    const client = await getOAuthClient(config);
    const authorization = getAuthorizationData(client);

    res.cookie(COOKIE_CODE_VERIFIER, authorization.codeVerifier, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });

    return res.redirect(authorization.url);
  };

  const oauthCallbackHandler: RequestHandler = async (req: Request, res: Response) => {
    if (!req.cookies?.[COOKIE_CODE_VERIFIER]) {
      return res.sendStatus(401);
    }

    if (!config.redirectUri) {
      config.redirectUri = urlJoin(`${req.headers.host?.includes('ngrok') ? 'https' : req.protocol}://`, req.headers.host, '/oauth/callback');
    }

    const client = await getOAuthClient(config);

    const params = client.callbackParams(req);

    const tokenSet = await client.callback(config.redirectUri, params, {
      code_verifier: req.cookies?.[COOKIE_CODE_VERIFIER],
    });

    const refreshToken = tokenSet.refresh_token;
    const accessToken = tokenSet.access_token;

    if (!refreshToken || !accessToken) {
      return res.sendStatus(500);
    }

    const gqlClient = createGqlClientUsingAccessToken({ accessToken });

    let orgRes: ApolloQueryResult<{ organization: { id: number } }>;
    try {
      orgRes = await gqlClient.query({
        query: ORGANIZATION_QUERY,
      });
    } catch (e) {
      return res.sendStatus(500);
    }

    const organizationId = orgRes.data.organization.id;

    if (!organizationId) {
      return res.sendStatus(500);
    }

    const org = await storage.getCredentialsByOrganizationId(organizationId);
    const clientToken = org?.clientToken || v4();

    if (!org) {
      storage.saveCredentials({
        refreshToken,
        accessToken,
        organizationId,
        clientToken,
      });

      if (config.onInstall) {
        config.onInstall(organizationId, clientToken);
      }
    } else {
      if (config.onLogin) {
        config.onLogin(organizationId, clientToken);
      }
    }

    res.clearCookie(COOKIE_REFRESH_TOKEN);
    res.clearCookie(COOKIE_CODE_VERIFIER);

    res.cookie(TOKEN_COOKIE_NAME, clientToken, { path: '/', secure: true, sameSite: 'none', httpOnly: true });

    res.redirect('/');
  };

  const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    await new Promise((resolve) => {
      cookieParser()(req, res, resolve);
    });

    if (req.path === '/oauth/authorize') {
      return oauthAuthorizeHandler(req, res, next);
    }

    if (req.path === '/oauth/callback') {
      return oauthCallbackHandler(req, res, next);
    }

    const token = req.cookies?.[TOKEN_COOKIE_NAME] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.redirect('/oauth/authorize');
    }

    const credentials = await storage.getCredentialsByClientToken(token);

    if (!credentials) {
      return res.redirect('/oauth/authorize');
    }

    req.user = {
      organizationId: credentials.organizationId,
      clientToken: credentials.clientToken,
    };

    req.app.enable('trust proxy');

    next();
  };

  return {
    authMiddleware,
    oauthInstallHandler: oauthAuthorizeHandler,
    oauthCallbackHandler,
  };
}
