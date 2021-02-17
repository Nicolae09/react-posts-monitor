import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://fakerql.stephix.uk/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
