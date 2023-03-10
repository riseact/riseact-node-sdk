import { BaseClient, Issuer, generators } from 'openid-client';

import { DEF_RISEACT_ACCOUNTS_URL } from '../config/consts';
import { AuthConfig } from '../types';
import urlJoin from '../utils/urlJoin';

interface AuthorizationData {
  url: string;
  codeVerifier: string;
}

export async function getOAuthClient(config: AuthConfig): Promise<BaseClient> {
  const riseactIssuer = await Issuer.discover(urlJoin(DEF_RISEACT_ACCOUNTS_URL, '/oauth/.well-known/openid-configuration/'));

  if (!config.clientId || !config.clientSecret || !config.redirectUri) {
    throw Error('OAuth client not valid. Check OAuth credentials');
  }

  const client = new riseactIssuer.Client({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uris: [config.redirectUri],
    response_types: ['code'],
  });

  return client;
}

export function getAuthorizationData(client: BaseClient): AuthorizationData {
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  return {
    codeVerifier,
    url: client.authorizationUrl({
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    }),
  };
}
