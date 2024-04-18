import { BaseClient, Issuer, generators } from 'openid-client';

import { OAuthCredentials, RiseactConfig, StorageDriver } from '../types';
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

export async function renewToken(
  clientId: string,
  clientSecret: string,
  oldCredentials: OAuthCredentials,
  hosts: {
    accounts: string;
    core: string;
  },
  storage: StorageDriver,
): Promise<OAuthCredentials> {
  const urlFormDataObj = {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: oldCredentials.refreshToken,
  };

  const urlFormDataArr: Array<string> = [];
  for (const property in urlFormDataObj) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(urlFormDataObj[property as keyof typeof urlFormDataObj]);
    urlFormDataArr.push(encodedKey + '=' + encodedValue);
  }
  const formBodyStr = urlFormDataArr.join('&');

  // Call auth server to refresh token
  const oauthRes = await fetch(urlJoin(hosts.accounts, '/oauth/token/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBodyStr,
  });

  // Check if response is ok
  const oauthResData = (await oauthRes.json()) as { access_token: string; refresh_token: string; expires_in: number };
  if (!oauthResData?.access_token || !oauthResData?.refresh_token) {
    throw new Error('Could not refresh token');
  }

  // Save new credentials
  const newCredentials: OAuthCredentials = {
    clientToken: oldCredentials.clientToken,
    organizationId: oldCredentials.organizationId,
    accessToken: oauthResData.access_token,
    refreshToken: oauthResData.refresh_token,
    expiresInSeconds: oauthResData.expires_in,
    expiresDateUTC: new Date(Date.now() + oauthResData.expires_in * 1000),
  };

  await storage.saveCredentials(newCredentials);
  return newCredentials;
}
