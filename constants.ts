export interface IIdentity {
    userId?: number;
    userEmail: string;
    userFirstName?: string;
    userLastName?: string;
    userImg?: string;
}

export enum HTTP_METHOD {
    PUT = 'PUT',
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
}