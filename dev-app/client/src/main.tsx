import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { gqlClient } from './config/network';
import { RiseactThemeProvider } from '@riseact/elements';

console.log('ok');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={gqlClient}>
    <RiseactThemeProvider>
      <Router />
    </RiseactThemeProvider>
  </ApolloProvider>,
);
