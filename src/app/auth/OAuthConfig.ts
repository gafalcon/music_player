import { AuthConfig } from 'angular-oauth2-oidc';

export const oauthConfig: AuthConfig = {

    // Url of the Identity Provider
    issuer: 'https://accounts.google.com',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: '178534904300-1qrnrg8i25v4b0kremgkf7k10m68khh0.apps.googleusercontent.com',

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile email',

    strictDiscoveryDocumentValidation: false

}
