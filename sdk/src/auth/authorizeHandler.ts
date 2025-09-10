import { Request, RequestHandler, Response } from 'express';

import safeAsyncHandler from '../utils/safeAsyncHandler';
import { getOAuthClient } from './authUtils';
import { generators } from 'openid-client';
import { PkceRecord, savePkce } from '../utils/lruCache';

const oauthAuthorizeHandler: RequestHandler = safeAsyncHandler(async (req: Request, res: Response) => {
  const config = req.riseact.config;
  const organization = req.query['__organization'] as string | undefined;

  if (!organization) {
    console.warn('[RISEACT-SDK] No organization specified in request query');
    return res.status(400).send('Organization not specified. Try to refresh the page.');
  }

  const client = await getOAuthClient(config);

  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  const state = generators.state();
  const pkceRecord: PkceRecord = {
    codeVerifier,
    organizationDomain: organization,
  };

  // Store the PKCE record in the cache with a TTL of 10 minutes
  savePkce(state, pkceRecord);

  const authorityRedirectUrl = client.authorizationUrl({
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    state,
    // This is a custom param used by Riseact Accounts to directly login to the specified organization
    __organization: organization,
  });

  return res.redirect(authorityRedirectUrl);
});

export default oauthAuthorizeHandler;
