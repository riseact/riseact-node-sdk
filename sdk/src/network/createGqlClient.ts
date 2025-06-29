import { ApolloClient, HttpLink, InMemoryCache, from, Observable, ApolloClientOptions } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import { renewToken } from '../auth/oauth';
import { StorageAdapters, OAuthCredentials } from '../types';
import urlJoin from '../utils/urlJoin';
import { RISEACT_CORE_URL, RISEACT_GQL_ENDPOINT } from '../config/consts';

interface InitParams {
  storage: StorageAdapters;
  organizationDomain: string;
  clientId: string;
  clientSecret: string;
  options?: Partial<ApolloClientOptions<unknown>>;
}

const initCreateGqlClient = async ({ storage, organizationDomain, clientId, clientSecret, options }: InitParams) => {
  let currentCredentials: OAuthCredentials | null = await storage.getCredentialsByOrganizationDomain(organizationDomain);

  if (!currentCredentials) {
    throw new Error('No credentials found for organization');
  }

  let refreshPromise: Promise<OAuthCredentials> | null = null;

  const refreshTokens = async (): Promise<OAuthCredentials> => {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const newCredentials = await renewToken(clientId, clientSecret, currentCredentials!, storage);
          currentCredentials = newCredentials;
          return newCredentials;
        } finally {
          refreshPromise = null;
        }
      })();
    }
    return refreshPromise;
  };

  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${currentCredentials!.accessToken}`,
    },
  }));

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    const unauth = graphQLErrors?.some((e) => e?.message === 'User is not authenticated');

    if (!unauth) return;

    return new Observable((observer) => {
      (async () => {
        try {
          const credentials = await refreshTokens();

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${credentials.accessToken}`,
            },
          }));

          forward(operation).subscribe({
            next: (v) => observer.next(v),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
        } catch (err) {
          // Something terrible happened, we can't recover from this. Try to remove credentials to force user to re-authenticate.
          console.error('[RA-SDK] Failed to refresh token, removing credentials for organization:', organizationDomain);
          storage.removeCredentials(organizationDomain);
          currentCredentials = null;
          observer.error(err);
        }
      })();

      return () => {
        /* unsubscription hook (noop) */
      };
    });
  });

  const httpLink = new HttpLink({
    uri: urlJoin(RISEACT_CORE_URL, RISEACT_GQL_ENDPOINT),
    fetchOptions: { mode: 'cors', credentials: 'omit' },
  });

  return new ApolloClient({
    ssrMode: true, // running under Node
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    ...options,
  });
};

export default initCreateGqlClient;
