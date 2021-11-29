import { LogLevel } from "@azure/msal-browser";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

const appClientId = process.env.REACT_APP_AUTHAPPID;
const backendApiUrl = process.env.REACT_APP_BACKENDAPIURL;
const backendApiAppId = process.env.REACT_APP_APIAPPID;

// Config object to be passed to Msal on creation
export const msalConfig = {
    auth: {
        clientId: appClientId,
        redirectUri: "/",
        postLogoutRedirectUri: "/"
    },
    cache: {
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

export const loginRequest = {
    scopes: [
        "User.Read",
        "User.ReadBasic.All"
    ]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const msGraphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

export const backendApiRequest = {
    url: backendApiUrl,
    scopes: ['api://' + backendApiAppId + "/user_impersonation"],
}