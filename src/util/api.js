const apipost = (functionName, payload) => {
    const backendApiUrlBase = process.env.REACT_APP_BACKENDAPIURL;
    const functionKey = process.env.REACT_APP_FUNCTIONKEY;
    let backendApiUrl = backendApiUrlBase + "/" + functionName;

    if (functionKey) {
        backendApiUrl = backendApiUrl + "?code=" + functionKey
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    // return promise
    return fetch(backendApiUrl, requestOptions);
}

export { apipost }