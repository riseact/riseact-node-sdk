import { ApolloClient, ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { createUploadLink } from 'apollo-upload-client';

import urlJoin from '../utils/urlJoin';

/** Unsafe, cannot refresh token if expired */
export const createGqlClientByAccessToken = ({
  accessToken,
  apolloOptions,
  coreHost,
}: {
  accessToken: string;
  apolloOptions?: ApolloClientOptions<unknown>;
  coreHost: string;
}) => {
  if (!accessToken) throw new Error('You must provide at last one of credentials or clientToken');

  if (typeof window !== 'undefined') {
    throw new Error('createApolloClient must only be called on the server');
  }

  const authorizedFetch = async (url: RequestInfo, init?: RequestInit) => {
    const res = await fetch(url, {
      ...init,
      headers: {
        ...init?.headers,
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + accessToken,
      },
    });

    const data = await res.clone().json();

    // If token is expired, try to refresh it
    if (data?.errors?.[0]?.message === 'User is not authenticated') {
      throw new Error('Token expired');
    }

    return res;
  };

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createUploadLink({
      uri: urlJoin(coreHost, '/admin/graphql/'),
      credentials: 'include',
      fetch: authorizedFetch,
    }),

    cache: new InMemoryCache(),
    ...apolloOptions,
  });
};
