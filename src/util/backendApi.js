import { backendApiRequest } from "../authConfig"
import { msalInstance } from '../index'

export async function bearerToken() {
    const account = msalInstance.getActiveAccount()
    if (!account) {
        throw Error(
            'No active account! Verify a user has been signed in and setActiveAccount has been called.'
        )
    }

    const response = await msalInstance.acquireTokenSilent({
        ...backendApiRequest,
        account: account,
    })

    return response.accessToken
}

async function buildHeader() {
    const headers = new Headers()

    const token = await bearerToken()
    if (token) {
        const bearer = `Bearer ${token}`
        headers.append('Authorization', bearer)
    }

    headers.append('Content-Type', 'application/json')

    return headers
}

function buildUrl(functionName) {
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

const apipost = (functionName, payload) => {
    const header = buildHeader()
    const url = buildUrl(functionName)
    const body = JSON.stringify(payload)

    const requestOptions = {
        method: 'POST',
        header: header,
        body: body
    };

    // return promise
    return fetch(url, requestOptions);
}

export { apipost }