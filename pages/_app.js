import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '../graphql/client';
import '../styles/variables.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
