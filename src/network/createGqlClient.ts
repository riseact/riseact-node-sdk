import { ApolloClient, ApolloClientOptions, HttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';

import { DEF_RISEACT_CORE_URL } from '../config/consts';
import urlJoin from '../utils/urlJoin';

interface GqlClientOptions {
  accessToken: string;
  refreshToken?: string;
  options?: ApolloClientOptions<unknown>;
}

const createGqlClient = ({ accessToken, refreshToken, options }: GqlClientOptions) => {
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
    })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        // todo refresh token if expired
      });
  };

  const httpLink = new HttpLink({
    uri: urlJoin(DEF_RISEACT_CORE_URL, '/graphql/'),
    credentials: 'include',
    fetch: authorizedFetch,
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
    ...options,
  });
};

export default createGqlClient;
