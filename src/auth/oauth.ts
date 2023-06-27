import { BaseClient, Issuer, generators } from 'openid-client';

import { RiseactConfig } from '../types';
import urlJoin from '../utils/urlJoin';

interface AuthorizationData {
  url: string;
  codeVerifier: string;
}

export async function getOAuthClient(config: RiseactConfig): Promise<BaseClient> {
  const riseactIssuer = await Issuer.discover(urlJoin(config.hosts?.accounts, '/oauth/.well-known/openid-configuration/'));

  if (!config.auth.clientId || !config.auth.clientSecret || !config.auth.redirectUri) {
    throw Error('OAuth client not valid. Check OAuth credentials');
  }

  const client = new riseactIssuer.Client({
    client_id: config.auth.clientId,
    client_secret: config.auth.clientSecret,
    redirect_uris: [config.auth.redirectUri],
    response_types: ['code'],
  });

  return client;
}

export function getAuthorizationData(client: BaseClient, organization?: string): AuthorizationData {
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);

  return {
    codeVerifier,
    url: client.authorizationUrl({
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      ...(organization && {
        __organization: organization,
      }),
    }),
  };
}
