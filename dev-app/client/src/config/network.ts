import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import axios from 'axios';
import urlJoin from 'url-join';
import { CLIENT_TOKEN_KEY, ORGANIZATION_KEY } from './const';

function getCurrentOrganization() {
  return localStorage.getItem(ORGANIZATION_KEY) || new URLSearchParams(window.location.search).get('__organization') || '';
}

/**
 * Drops the local session and restarts the OAuth flow.
 *
 * The organization must be carried over explicitly: navigating to '/' loses the
 * `__organization` query param, and the authorize endpoint answers
 * "Organization not specified. Try to refresh the page." without it.
 */
export function redirectToAuth() {
  const organization = getCurrentOrganization();

  localStorage.removeItem(CLIENT_TOKEN_KEY);
  localStorage.removeItem(ORGANIZATION_KEY);

  document.location.href = organization ? `/oauth/authorize?__organization=${encodeURIComponent(organization)}` : '/';
}

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
    redirectToAuth();
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

export const apiClient = axios.create();

// Read the session on every request: baking the headers into the instance
// snapshots localStorage at module load, so a token stored or rotated later
// (sid exchange, re-install) leaves every following call unauthenticated.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(CLIENT_TOKEN_KEY);
  const organization = localStorage.getItem(ORGANIZATION_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (organization) {
    config.headers['X-Riseact-Organization'] = organization;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // Unauthenticated requests are 302'd to /oauth/authorize by the SDK auth
    // middleware; axios follows the redirect, so the failure arrives as a 2xx/4xx
    // from the authorize endpoint instead of a 401 on the original call.
    const responseURL: string | undefined = response.request?.responseURL;

    if (responseURL && responseURL.includes('/oauth/authorize')) {
      redirectToAuth();
    }

    return response;
  },
  (error) => {
    const status = error.response?.status;
    const responseURL: string | undefined = error.request?.responseURL;

    if (status === 401 || (responseURL && responseURL.includes('/oauth/authorize'))) {
      redirectToAuth();
    }

    return Promise.reject(error);
  },
);
