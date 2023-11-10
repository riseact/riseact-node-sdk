import { ApolloClient, ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';
import fetch from 'cross-fetch';

import { renewToken } from '../auth/oauth';
import { StorageDriver } from '../types';
import urlJoin from '../utils/urlJoin';

const createGqlClientByOrgId = async ({
  options,
  storage,
  organizationId,
  clientId,
  clientSecret,
  hosts,
}: {
  storage: StorageDriver;
  options?: Partial<ApolloClientOptions<unknown>>;
  organizationId: number;
  clientId: string;
  clientSecret: string;
  hosts: {
    accounts: string;
    core: string;
  };
}) => {
  const credentials = await storage.getCredentialsByOrganizationId(organizationId);
  if (!credentials) throw new Error('No credentials found for organization');

  const authorizedFetch = async (url: RequestInfo, init?: RequestInit) => {
    const res = await fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + credentials.accessToken,
      },
    });

    const data = await res.clone().json();

    // If token is expired, try to refresh it
    if (data?.errors?.[0]?.message === 'User is not authenticated') {
      const newCredentials = await renewToken(clientId, clientSecret, credentials, hosts, storage);

      // Call original request again with new token
      return fetch(url, {
        ...init,
        headers: {
          ...init?.headers,
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + newCredentials.accessToken,
        },
      });
    }

    return res;
  };

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      uri: urlJoin(hosts.core, '/admin/graphql/'),
      credentials: 'include',
      fetch: authorizedFetch,
    }),

    cache: new InMemoryCache(),
    ...options,
  });
};

export default createGqlClientByOrgId;
