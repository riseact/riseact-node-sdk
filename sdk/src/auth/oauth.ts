import { BaseClient, Issuer, generators } from 'openid-client';

import { OAuthCredentials, RiseactConfig, StorageAdapters } from '../types';
import urlJoin from '../utils/urlJoin';
import { OAUTH_REDIRECT_URI, RISEACT_ACCOUNTS_URL } from '../config/consts';

interface AuthorizationData {
  url: string;
  codeVerifier: string;
}

export async function getOAuthClient(config: RiseactConfig): Promise<BaseClient> {
  let riseactIssuer;

  try {
    riseactIssuer = await Issuer.discover(urlJoin(RISEACT_ACCOUNTS_URL, '/oauth/.well-known/openid-configuration/'));
  } catch (error) {
    console.error(
      `[RISEACT-SDK] Error during OAuth issuer discovery. Call to ${urlJoin(RISEACT_ACCOUNTS_URL, '/oauth/.well-known/openid-configuration/')} failed. Details below:`,
      error,
    );
    throw Error('Could not discover OAuth issuer from Riseact accounts server');
  }

  if (!config.auth.clientId || !config.auth.clientSecret || !config.network.appPublicUrl) {
    console.error('[RISEACT-SDK] OAuth client ID, client secret or app public URL not provided in RiseactConfig');
    throw Error('OAuth client not valid. Check OAuth credentials');
  }

  const client = new riseactIssuer.Client({
    client_id: config.auth.clientId,
    client_secret: config.auth.clientSecret,
    redirect_uris: [urlJoin(config.network.appPublicUrl, OAUTH_REDIRECT_URI)],
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
  storage: StorageAdapters,
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
  const oauthRes = await fetch(urlJoin(RISEACT_ACCOUNTS_URL, '/oauth/token/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBodyStr,
  });
  if (!oauthRes.ok) {
    throw new Error(`Failed to refresh token for org: ${oldCredentials.organizationDomain} - ${oauthRes.status} ${oauthRes.statusText}`);
  }

  // Check if response is ok
  const oauthResData = (await oauthRes.json()) as { access_token: string; refresh_token: string; expires_in: number };
  if (!oauthResData?.access_token || !oauthResData?.refresh_token) {
    throw new Error('Could not refresh token. Response from riseact did not contain access_token or refresh_token');
  }

  // Save new credentials
  const newCredentials: OAuthCredentials = {
    clientToken: oldCredentials.clientToken,
    organizationDomain: oldCredentials.organizationDomain,
    accessToken: oauthResData.access_token,
    refreshToken: oauthResData.refresh_token,
    expiresInSeconds: oauthResData.expires_in,
    expiresDateUTC: new Date(Date.now() + oauthResData.expires_in * 1000),
  };

  await storage.setCredentials(newCredentials);
  return newCredentials;
}
