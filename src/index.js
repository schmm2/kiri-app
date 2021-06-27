import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const backendApiUrl = process.env.REACT_APP_BACKENDAPIURL;
const functionKey = process.env.REACT_APP_FUNCTIONKEY;

let graphqlUrl = backendApiUrl + "/graphql"

console.log("GRAPHQL API URL", graphqlUrl)

// add key to authenticate
if(functionKey){
  console.log("found function key");
  graphqlUrl = graphqlUrl + "?code=" + functionKey;
}

const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
