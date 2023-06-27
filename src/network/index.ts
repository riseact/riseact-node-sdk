import { ApolloClientOptions } from '@apollo/client/core';
import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { TOKEN_COOKIE_NAME } from '../config/consts';
import { NetworkConfig, RiseactConfig, RiseactNetwork, StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';
import { createGqlClientUsingOrganizationId } from './createGqlClient';

const initNetwork = async (
  config: RiseactConfig,
  storage: StorageDriver,
  clientId: string,
  clientSecret: string,
): Promise<RiseactNetwork> => {
  if (!config.network) {
    config.network = {};
  }

  const proxy = createProxyMiddleware({
    target: config.hosts!.core,
    changeOrigin: true,
    secure: false,
    logLevel: 'error',
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

    // todo check refresh token

    req.headers.authorization = `Bearer ${credentials.accessToken}`;

    if (config.network!.gqlRewriterMiddleware) {
      config.network!.gqlRewriterMiddleware(req, res, () => undefined);
    }

    req.originalUrl = urlJoin(config.hosts!.core, '/graphql/');

    proxy(req, res, next);
  };

  const createGqlClient = async (organizationId: number, options?: ApolloClientOptions<unknown>) => {
    return createGqlClientUsingOrganizationId({ organizationId, storage, options, clientId, clientSecret, hosts: {
      core: config.hosts!.core!,
      accounts: config.hosts!.accounts!,
    } });
  };
  return {
    gqlRewriterHandler,
    createGqlClient,
  };
};

export default initNetwork;
