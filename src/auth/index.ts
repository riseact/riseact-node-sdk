import { ApolloQueryResult, gql } from '@apollo/client/core';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { uuid } from 'uuidv4';

import { COOKIE_CODE_VERIFIER, COOKIE_REFRESH_TOKEN, TOKEN_COOKIE_NAME } from '../config/consts';
import createGqlClient from '../network/createGqlClient';
import { AuthConfig, CredentialsStorage, RiseactAuth } from '../types';
import { getAuthorizationData, getOAuthClient } from './oauth';

const ORGANIZATION_QUERY = gql`
  query Organization {
    organization {
      id
      name
    }
  }
`;

export async function initAuth(config: AuthConfig, storage: CredentialsStorage): Promise<RiseactAuth> {
  const client = await getOAuthClient(config);

  const oauthInstallHandler: RequestHandler = async (_req: Request, res: Response) => {
    const authorization = getAuthorizationData(client);

    res.cookie(COOKIE_CODE_VERIFIER, authorization.codeVerifier, {
      sameSite: 'none',
      secure: true,
    });

    return res.redirect(authorization.url);
  };

  const oauthCallbackHandler: RequestHandler = async (req: Request, res: Response) => {
    if (!req.cookies?.[COOKIE_CODE_VERIFIER]) {
      return res.sendStatus(401);
    }

    const params = client.callbackParams(req);

    const tokenSet = await client.callback(config.redirectUri, params, {
      code_verifier: req.cookies?.[COOKIE_CODE_VERIFIER],
    });
    res.clearCookie(COOKIE_CODE_VERIFIER);

    const refreshToken = tokenSet.refresh_token;
    const accessToken = tokenSet.access_token;

    if (!refreshToken || !accessToken) {
      return res.sendStatus(500);
    }

    const gqlClient = createGqlClient({ accessToken });

    let orgRes: ApolloQueryResult<{ organization: { id: number } }>;
    try {
      orgRes = await gqlClient.query({
        query: ORGANIZATION_QUERY,
      });
    } catch (e) {
      return res.sendStatus(500);
    }

    const organizationId = orgRes.data.organization.id;
    const clientToken = uuid();

    res.cookie(TOKEN_COOKIE_NAME, clientToken);

    if (!refreshToken || !accessToken || !clientToken || !organizationId) {
      return res.sendStatus(500);
    }

    storage.saveCredentials({
      refreshToken,
      accessToken,
      organizationId,
      clientToken,
    });

    res.clearCookie(COOKIE_REFRESH_TOKEN);

    res.redirect('/');
  };

  const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    await new Promise((resolve) => {
      cookieParser()(req, res, resolve);
    });

    if (req.path === '/oauth/authorize') {
      return oauthInstallHandler(req, res, next);
    }

    if (req.path === '/oauth/callback') {
      return oauthCallbackHandler(req, res, next);
    }

    const token = req.cookies?.[TOKEN_COOKIE_NAME] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.redirect('/oauth/authorize');
    }

    const credentials = await storage.getCredentials(token);

    if (!credentials) {
      return res.redirect('/oauth/authorize');
    }

    next();
  };

  return {
    authMiddleware,
    oauthInstallHandler,
    oauthCallbackHandler,
  };
}
