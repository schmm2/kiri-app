import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// MSAL imports
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig, backendApiRequest } from "./authConfig";
import { getBearerToken } from 'util/api'

// backend api url
const backendApiUrl = process.env.REACT_APP_BACKENDAPIURL;
const httpLink = createHttpLink({
    uri: backendApiUrl + '/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    try {
        const token = await getBearerToken(backendApiRequest)

        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
            }
        }
    } catch {
        console.log("unable to aquire tokenn, no bearer token was added to header");
        return { headers };
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
        <Router>
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