import { Request, RequestHandler, Response } from 'express';

import { COOKIE_CODE_VERIFIER } from '../config/consts';
import { RiseactConfig } from '../types';
import urlJoin from '../utils/urlJoin';
import { getAuthorizationData, getOAuthClient } from './oauth';

const initAuthorizeHandler = (config: RiseactConfig): RequestHandler => {
  const oauthAuthorizeHandler: RequestHandler = async (req: Request, res: Response) => {
    const organization = req.query['__organization'] as string | undefined;

    if (!config.auth.redirectUri) {
      config.auth.redirectUri = urlJoin(`${req.headers.host?.includes('ngrok') ? 'https' : req.protocol}://`, req.headers.host, '/oauth/callback');
    }
    const client = await getOAuthClient(config);
    const authorization = getAuthorizationData(client, organization);

    res.cookie(COOKIE_CODE_VERIFIER, authorization.codeVerifier, {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    });

    return res.redirect(authorization.url);
  };

  return oauthAuthorizeHandler;
};

export default initAuthorizeHandler;
