import { ApolloClientOptions } from '@apollo/client/core';
import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { DEF_RISEACT_CORE_URL, TOKEN_COOKIE_NAME } from '../config/consts';
import { NetworkConfig, RiseactNetwork, StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';
import { createGqlClientUsingOrganizationId } from './createGqlClient';

const initNetwork = async (config: NetworkConfig = {}, storage: StorageDriver, clientId: string, clientSecret: string): Promise<RiseactNetwork> => {
  const proxy = createProxyMiddleware({
    target: DEF_RISEACT_CORE_URL,
    changeOrigin: true,
    secure: false,
  });

  const gqlRewriterHandler: RequestHandler = async (req, res, next) => {
    cookieParser()(req, res, () => undefined);

    const token = req.cookies?.[TOKEN_COOKIE_NAME] || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.sendStatus(401);
    }

    const credentials = await storage.getCredentialsByClientToken(token);
    if (!credentials) {
      return res.sendStatus(401);
    }

    req.headers.authorization = `Bearer ${credentials.accessToken}`;

    if (config.gqlRewriterMiddleware) {
      config.gqlRewriterMiddleware(req, res, () => undefined);
    }

    req.originalUrl = urlJoin(DEF_RISEACT_CORE_URL, '/graphql/');

    proxy(req, res, next);
  };

  const createGqlClient = async (organizationId: number, options?: ApolloClientOptions<unknown>) => {
    return createGqlClientUsingOrganizationId({ organizationId, storage, options, clientId, clientSecret });
  };

  return {
    gqlRewriterHandler,
    createGqlClient,
  };
};

export default initNetwork;
