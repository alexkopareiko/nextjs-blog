export interface IIdentity {
    userId?: number;
    userEmail: string;
    userFirstName?: string;
    userLastName?: string;
    userImg?: string;
    userToken?: string;
    userPhone?: string;
    userRole?: string;
}

export interface ICategory {
    catId?: number;
    catName?: string;
}


export interface IProduct {
    prodId?: number;
    prodTitle?: string;
    prodDesc?: string;
    catId?: number;
    userId?: number;
    prodPrice?: number;
    prodYear?: number;
    prodImg?: string;
    createdAt?: number;
    updatedAt?: number;
}

export interface IReview {
    revId?: number;
    revFeedback?: string;
    ownerUserId?: number;
    prodUserId?: number;
    revRating?: number;
    prodId?: number;
    createdAt?: number;
    updatedAt?: number;
}

export enum HTTP_METHOD {
    PUT = 'PUT',
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
}

export enum ENTITIES {
    PRODUCTS = 'products',
    REVIEWS = 'reviews',
    USERS = 'users',
    CATEGORIES = 'categories',
}

export const commons = {
    imgDummy: 'https://zm-cs.ru/files/avatars/1537189754.jpg',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
};


