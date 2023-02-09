import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { DEF_RISEACT_CORE_URL, TOKEN_COOKIE_NAME } from '../config/consts';
import { CredentialsStorage, NetworkConfig, RiseactNetwork } from '../types';

const initNetwork = async (config: NetworkConfig = {}, storage: CredentialsStorage): Promise<RiseactNetwork> => {
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

    const credentials = await storage.getCredentials(token);
    if (!credentials) {
      return res.sendStatus(401);
    }

    req.headers.authorization = `Bearer ${credentials.accessToken}`;

    if (config.gqlRewriterMiddleware) {
      config.gqlRewriterMiddleware(req, res, () => undefined);
    }

    proxy(req, res, next);
  };

  return {
    gqlRewriterHandler,
  };
};

export default initNetwork;
