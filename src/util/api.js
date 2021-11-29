import { backendApiRequest, msGraphConfig, loginRequest } from "../authConfig";
import { msalInstance } from "../index";

export async function getBearerToken(scopes) {
    const account = msalInstance.getActiveAccount()
    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }

    const response = await msalInstance.acquireTokenSilent({
        ...scopes,
        account: account
    })

    return response.accessToken
}


async function buildHeader(token) {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    if (token) {
        const bearer = `Bearer ${token}`
        headers.append('Authorization', bearer)
    }
    return headers
}

function buildFunctionUrl(functionName) {
    const backendApiUrlBase = process.env.REACT_APP_BACKENDAPIURL
    let backendApiUrl = backendApiUrlBase + "/" + functionName;

    // if prod env AND function key is set we have to adjust url
    if (process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
        // api auth with function key
        if (process.env.REACT_APP_FUNCTIONKEY) {
            backendApiUrl = backendApiUrl + "?code=" + process.env.REACT_APP_FUNCTIONKEY
        }
    }
    return backendApiUrl
}

export async function getMsGraphProfile() {
    const token = await getBearerToken(loginRequest)
    const headers = await buildHeader(token);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(msGraphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function postBackendApi(functionName, payload) {
    const token = await getBearerToken(backendApiRequest);
    const headers = await buildHeader(token)
    const url = buildFunctionUrl(functionName)
    const body = JSON.stringify(payload)

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body
    };

    // return promise
    return fetch(url, requestOptions);
}