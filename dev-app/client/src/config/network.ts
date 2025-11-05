import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';
import urlJoin from 'url-join';
import { CLIENT_TOKEN_KEY, ORGANIZATION_KEY } from './const';

const httpLink = createHttpLink({
  uri: urlJoin(window.location.origin, '/graphql'),
  fetchOptions: { credentials: 'omit' },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(CLIENT_TOKEN_KEY);
  const organization = localStorage.getItem(ORGANIZATION_KEY);

  return {
    headers: {
      ...(headers as Record<string, string>),
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
            'X-Riseact-Organization': organization,
          }
        : {}),
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  let shouldLogout = false;

  if (graphQLErrors?.length) {
    shouldLogout = graphQLErrors.some(
      (e) =>
        e.extensions?.code === 'FORBIDDEN' ||
        e.extensions?.code === 'UNAUTHENTICATED' ||
        (typeof e.message === 'string' && e.message.toLowerCase().includes('forbidden')),
    );
  }

  if (!shouldLogout && networkError) {
    const anyErr = networkError as any;
    const status = anyErr.statusCode ?? anyErr.status ?? anyErr.response?.status ?? anyErr.result?.status;
    if (status === 401 || status === 403) shouldLogout = true;
  }

  if (shouldLogout) {
    const lastOrg = localStorage.getItem(ORGANIZATION_KEY);

    localStorage.removeItem(CLIENT_TOKEN_KEY);
    localStorage.removeItem(ORGANIZATION_KEY);

    document.location.href = lastOrg ? `/?__organization=${lastOrg}` : '/';
    // note: / will trigger an "Organization not specified. Try to refresh the page"
  }
});

export const gqlClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache', errorPolicy: 'ignore' },
    query: { fetchPolicy: 'no-cache', errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
});

export const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(CLIENT_TOKEN_KEY)}`,
    'X-Riseact-Organization': localStorage.getItem(ORGANIZATION_KEY),
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const lastOrg = localStorage.getItem(ORGANIZATION_KEY);

      localStorage.removeItem(CLIENT_TOKEN_KEY);
      localStorage.removeItem(ORGANIZATION_KEY);

      document.location.href = lastOrg ? `/?__organization=${lastOrg}` : '/';
      // note: / will trigger an "Organization not specified. Try to refresh the page"
    }
    return Promise.reject(error);
  },
);
