import cookieParser from 'cookie-parser';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { TOKEN_COOKIE_NAME } from '../config/consts';
import { RiseactConfig, StorageDriver } from '../types';
import initAuthorizeHandler from './authorizeHandler';
import initCallbackHandler from './callbackHandler';
import { renewToken } from './oauth';

const initAuthMiddleware = (config: RiseactConfig, storage: StorageDriver): RequestHandler => {
  const callbackHandler = initCallbackHandler(config, storage);
  const authorizeHandler = initAuthorizeHandler(config);

  const authMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    await new Promise((resolve) => {
      cookieParser()(req, res, resolve);
    });

    const organization = req.query['__organization'];
    const authorizePageUrl = '/oauth/authorize' + (organization ? `?__organization=${organization}` : '');

    if (req.path.match(/^\/oauth\/authorize/)) {
      return authorizeHandler(req, res, next);
    }

    if (req.path.match(/^\/oauth\/callback/)) {
      return callbackHandler(req, res, next);
    }

    const token = req.cookies?.[TOKEN_COOKIE_NAME] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.info('No client token found, redirecting to authorize page');
      return res.redirect(authorizePageUrl);
    }

    let credentials = await storage.getCredentialsByClientToken(token);

    if (!credentials) {
      console.info('No credentials found in storage, redirecting to authorize page');
      return res.redirect(authorizePageUrl);
    }

    if (credentials.expiresDateUTC < new Date()) {
      console.info('Token expired, try to renew it');
      try {
        credentials = await renewToken(config.auth.clientId, config.auth.clientSecret, credentials, config.hosts!, storage);
      } catch (e) {
        console.error('Error while renewing token', e);
        return res.redirect(authorizePageUrl);
      }
    }

    req.user = {
      organizationSlug: organization as string,
      organizationId: credentials.organizationId,
      clientToken: credentials.clientToken,
    };

    req.app.enable('trust proxy');
    next();
  };

  return authMiddleware;
};

export default initAuthMiddleware;
