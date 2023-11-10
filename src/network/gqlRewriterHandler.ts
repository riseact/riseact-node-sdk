import cookieParser from 'cookie-parser';
import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { renewToken } from '../auth/oauth';
import { TOKEN_COOKIE_NAME } from '../config/consts';
import { RiseactConfig, StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';

const createGqlRewriterHandler = (config: RiseactConfig, storage: StorageDriver) => {
  const proxy = createProxyMiddleware({
    target: config.hosts!.core,
    changeOrigin: true,
    secure: false,
    logLevel: 'error',
  });

  const gqlRewriterHandler: RequestHandler = async (req, res, next) => {
    cookieParser()(req, res, () => undefined);
    const authorizePageUrl = '/oauth/authorize' + (req.user?.organizationId ? `?__organization=${req.user.organizationSlug}` : '');

    // Get client token from cookie or header
    const token = req.cookies?.[TOKEN_COOKIE_NAME] || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.redirect(authorizePageUrl);
    }

    // Get credentials from storage by client token
    let credentials = await storage.getCredentialsByClientToken(token);

    // If no credentials found, redirect to authorize page
    if (!credentials) {
      return res.redirect(authorizePageUrl);
    }

    // If token is expired, try to refresh it
    if (credentials.expiresDateUTC.getTime() < Date.now()) {
      try {
        const newCredentials = await renewToken(config.auth.clientId!, config.auth.clientSecret!, credentials, config.hosts!, storage);
        credentials = newCredentials;
      } catch (e) {
        return res.redirect(authorizePageUrl);
      }
    }

    req.headers.authorization = `Bearer ${credentials.accessToken}`;

    // Call the custom middleware if exists
    if (config.network!.gqlRewriterMiddleware) {
      config.network!.gqlRewriterMiddleware(req, res, () => undefined);
    }

    req.originalUrl = urlJoin(config.hosts!.core, '/admin/graphql/');

    proxy(req, res, next);
  };

  return gqlRewriterHandler;
};

export default createGqlRewriterHandler;
