import { NextFunction, Request, RequestHandler, Response } from 'express';

import safeAsyncHandler from '../utils/safeAsyncHandler';

const authMiddleware: RequestHandler = safeAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const storage = req.riseact.storage;

  // Create OAuth redirect link
  const authorizePageUrl = '/oauth/authorize?__organization=' + (req.query['__organization'] || '');

  // Get token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.info('[RISEACT-SDK] No client token provided, redirecting to authorize page');
    return res.redirect(authorizePageUrl);
  }

  const credentials = await storage.getCredentialsByClientToken(token);

  if (!credentials) {
    console.info('[RISEACT-SDK] No credentials found in storage, redirecting to authorize page');
    // return res.redirect(authorizePageUrl);
    return res.status(401).send('Invalid client token');
  }

  // Check if the organization domain in the token cookie matches the one in the request query in first load from iframe
  // note: __organization is provided only in the first request from riseact admin application iframe
  if (req.query['__organization'] && req.query['__organization'] !== credentials.organizationDomain) {
    console.warn('[RISEACT-SDK] Organization domain mismatch in saved credentials, redirecting to authorize page');
    return res.redirect(authorizePageUrl);
  }

  req.organizationDomain = credentials.organizationDomain;

  req.app.enable('trust proxy');
  next();
});

export default authMiddleware;
