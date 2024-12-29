export interface User {
    id: string;
    displayName: string;
    givenName: string;
    surname: string;
    mail: string;
    userPrincipalName: string;
    [key: string]: any;
}
