import { ApolloClient, ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'cross-fetch';

import { DEF_RISEACT_ACCOUNTS_URL, DEF_RISEACT_CORE_URL } from '../config/consts';
import { StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';

/** Unsafe, cannot refresh token if expired */
export const createGqlClientUsingAccessToken = ({ accessToken, options }: { accessToken: string; options?: ApolloClientOptions<unknown> }) => {
  if (!accessToken) throw new Error('You must provide at last one of credentials or clientToken');

  if (typeof window !== 'undefined') {
    throw new Error('createApolloClient must only be called on the server');
  }

  const authorizedFetch = (url: RequestInfo, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + accessToken,
      },
    });
  };

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      uri: urlJoin(DEF_RISEACT_CORE_URL, '/graphql/'),
      credentials: 'include',
      fetch: authorizedFetch,
    }),

    cache: new InMemoryCache(),
    ...options,
  });
};

export const createGqlClientUsingOrganizationId = async ({
  options,
  storage,
  organizationId,
  clientId,
  clientSecret,
}: {
  storage: StorageDriver;
  options?: Partial<ApolloClientOptions<unknown>>;
  organizationId: number;
  clientId: string;
  clientSecret: string;
}) => {
  const credentials = await storage.getCredentialsByOrganizationId(organizationId);
  if (!credentials) throw new Error('No credentials found for organization');

  const authorizedFetch = (url: RequestInfo, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + credentials.accessToken,
      },
    }).then(async (res) => {
      const data = await res.clone().json();

      if (data?.errors?.[0]?.message === 'User is not authenticated') {
        const urlFormDataObj = {
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: credentials.refreshToken,
        };

        const urlFormDataArr = [];
        for (const property in urlFormDataObj) {
          const encodedKey = encodeURIComponent(property);
          const encodedValue = encodeURIComponent(urlFormDataObj[property as keyof typeof urlFormDataObj]);
          urlFormDataArr.push(encodedKey + '=' + encodedValue);
        }
        const formBodyStr = urlFormDataArr.join('&');

        const res = await fetch(urlJoin(DEF_RISEACT_ACCOUNTS_URL, '/oauth/token/'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formBodyStr,
        });
        const data = (await res.json()) as { access_token: string; refresh_token: string; expires_in: number };
        if (!data?.access_token || !data?.refresh_token) {
          throw new Error('Could not refresh token');
        }

        await storage.saveCredentials({
          clientToken: credentials.clientToken,
          organizationId: organizationId,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });

        return fetch(url, {
          ...init,
          headers: {
            ...init?.headers,
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + credentials.accessToken,
          },
        });
      } else {
        return res;
      }
    });
  };

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      uri: urlJoin(DEF_RISEACT_CORE_URL, '/graphql/'),
      credentials: 'include',
      fetch: authorizedFetch,
    }),

    cache: new InMemoryCache(),
    ...options,
  });
};
