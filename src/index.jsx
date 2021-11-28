import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// MSAL imports
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

import { buildHeader, bearerToken } from 'util/backendApi'

// Build backend url
const backendApiUrl = process.env.REACT_APP_BACKENDAPIURL;
const functionKey = process.env.REACT_APP_FUNCTIONKEY;
let graphqlUrl = "";

if (backendApiUrl) {
    graphqlUrl = backendApiUrl + "/graphql"
    console.log("GRAPHQL BACKEND API URL", graphqlUrl)
} else {
    console.log("GRAPHQL BACKEND API URL not defined");
}

// add key to authenticate
if (functionKey) {
    console.log("found function key");
    graphqlUrl = graphqlUrl + "?code=" + functionKey;
}

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await bearerToken()
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    fetchOptions: {
        mode: 'no-cors',
    },
});

// MSAL
export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

ReactDOM.render(
    <React.StrictMode >
        <Router >
            <ApolloProvider client={client} >
                <App pca={msalInstance} />
            </ApolloProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();