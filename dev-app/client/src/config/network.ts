import { ApolloClient, InMemoryCache } from '@apollo/client';
import urlJoin from 'url-join';

export const gqlClient = new ApolloClient({
  uri: urlJoin(location.origin, '/graphql'),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});
