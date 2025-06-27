import { Request, RequestHandler, Response } from 'express';

import { COOKIE_CODE_VERIFIER } from '../config/consts';
import { CodeVerifierCookie, RiseactConfig } from '../types';
import safeAsyncHandler from '../utils/safeAsyncHandler';
import { getAuthorizationData, getOAuthClient } from './oauth';

const initAuthorizeHandler = (config: RiseactConfig): RequestHandler => {
  const oauthAuthorizeHandler: RequestHandler = safeAsyncHandler(async (req: Request, res: Response) => {
    const organization = req.query['__organization'] as string | undefined;

    if (!organization) {
      console.warn('[RA-SDK] No organization specified in request query');
      return res.status(400).send('Organization not specified');
    }

    const client = await getOAuthClient(config);
    const authorization = getAuthorizationData(client, organization);

    const codeVerifierCookie: CodeVerifierCookie = {
      code: authorization.codeVerifier,
      organizationDomain: organization,
    };

    const codeVerifierCookieString = JSON.stringify(codeVerifierCookie);

    res.cookie(COOKIE_CODE_VERIFIER, codeVerifierCookieString, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });

    return res.redirect(authorization.url);
  });

  return oauthAuthorizeHandler;
};

export default initAuthorizeHandler;
