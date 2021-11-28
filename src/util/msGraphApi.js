import { msGraphScopes, msGraphConfig } from "../authConfig";
import { msalInstance } from "../index";

export async function bearerToken() {
    const account = msalInstance.getActiveAccount()
    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }

    const response = await msalInstance.acquireTokenSilent({
        ...msGraphScopes,
        account: account
    })
    console.log(response);

    return response.accessToken
}


async function buildHeader() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const token = await bearerToken()
    if (token) {
        const bearer = `Bearer ${token}`
        headers.append('Authorization', bearer)
    } else {
        console.log(token)
    }

    return headers
}

export async function getProfile() {
    const headers = await buildHeader();

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch(msGraphConfig.graphMeEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}