import { NextFunction, Request, RequestHandler, Response } from 'express';

import { COOKIE_CLIENT_TOKEN } from '../config/consts';
import { ClientTokenCookie, RiseactConfig, StorageAdapters } from '../types';
import initAuthorizeHandler from './authorizeHandler';
import initCallbackHandler from './callbackHandler';
import safeAsyncHandler from '../utils/safeAsyncHandler';

const initAuthMiddleware = (config: RiseactConfig, storage: StorageAdapters): RequestHandler => {
  const authorizeHandler = initAuthorizeHandler(config);
  const callbackHandler = initCallbackHandler(config, storage);

  const authMiddleware: RequestHandler = safeAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Reply to / requests from iframe in riseact admin application page
    // riseact admin add a query parameter __organization in the request

    // Intercept OAuth authorization and callback requests
    if (req.path.match(/^\/oauth\/authorize/)) {
      return authorizeHandler(req, res, next);
    }

    // Intercept OAuth callback requests
    if (req.path.match(/^\/oauth\/callback/)) {
      return callbackHandler(req, res, next);
    }

    // Create OAuth redirect link
    const authorizePageUrl = '/oauth/authorize?__organization=' + (req.query['__organization'] || '');

    // Get token from cookies or authorization header
    const tokenCookieString = req.cookies?.[COOKIE_CLIENT_TOKEN]; // || req.headers.authorization?.split(' ')[1];

    if (!tokenCookieString) {
      console.info('[RA-SDK] No client token found, redirecting to authorize page');
      return res.redirect(authorizePageUrl);
    }

    let tokenCookie: ClientTokenCookie;
    try {
      tokenCookie = JSON.parse(tokenCookieString) as ClientTokenCookie;
    } catch {
      return res.redirect(authorizePageUrl);
    }

    const credentials = await storage.getCredentialsByClientToken(tokenCookie.token);

    if (!credentials) {
      console.info('[RA-SDK] No credentials found in storage, redirecting to authorize page');
      res.clearCookie(COOKIE_CLIENT_TOKEN, { path: '/', sameSite: 'none', secure: true });
      return res.redirect(authorizePageUrl);
    }

    if (credentials.organizationDomain !== tokenCookie.organizationDomain) {
      console.warn('[RA-SDK] Organization domain mismatch in client token cookie, redirecting to authorize page');
      res.clearCookie(COOKIE_CLIENT_TOKEN, { path: '/', sameSite: 'none', secure: true });
      return res.redirect(authorizePageUrl);
    }

    // todo use a fail-first approach to check if the token is expired
    // if (credentials.expiresDateUTC < new Date()) {
    //   console.info('[RA-SDK] Token expired, try to renew it');
    //   try {
    //     credentials = await renewToken(config.auth.clientId, config.auth.clientSecret, credentials, storage);
    //   } catch (e) {
    //     console.error('[RA-SDK] Error while renewing token', e);
    //     return res.redirect(authorizePageUrl);
    //   }
    // }

    req.organizationDomain = credentials.organizationDomain;

    // remove residual cookies
    // if (req.cookies?.[COOKIE_CODE_VERIFIER]) {
    //   res.clearCookie(COOKIE_CODE_VERIFIER, { path: '/', sameSite: 'none', secure: true });
    // }

    req.app.enable('trust proxy');
    next();
  });

  return authMiddleware;
};

export default initAuthMiddleware;
