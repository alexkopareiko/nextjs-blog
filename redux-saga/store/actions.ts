export const actionTypes = {
    IS_HYDRATED: 'IS_HYDRATED',

    //LOGIN_INTERFACE
    BTN_LOGIN_CLICK: 'BTN_LOGIN_CLICK',

    //userReducer
    SET_USER_INFO: 'SET_USER_INFO',

    //productReducer
    GET_PRODUCTS_INFO: 'GET_PRODUCTS_INFO',
    SET_PRODUCTS_INFO: 'SET_PRODUCTS_INFO',
    SET_SINGLE_PRODUCT_INFO: 'SET_SINGLE_PRODUCT_INFO',
    GET_SINGLE_PRODUCT_INFO: 'GET_SINGLE_PRODUCT_INFO',

    HYDRATE: 'HYDRATE',

}

export function isHydrated() {
    return {
        type: actionTypes.IS_HYDRATED,
        payload: true,
    }
}


export function btnLoginClick(payload: any) {
    return {
        type: actionTypes.BTN_LOGIN_CLICK,
        payload,
    }
}

//userReducer

export function setUserInfo(payload: any, token: string) {
    return {
        type: actionTypes.SET_USER_INFO,
        payload,
        token
    }
}


//productReducer
export function getProductsInfo() {
    return {
        type: actionTypes.GET_PRODUCTS_INFO,
    }
}
export function setProductsInfo(payload: any) {
    return {
        type: actionTypes.SET_PRODUCTS_INFO,
        payload,
    }
}
export function getSingleProductInfo(payload: any) {
    return {
        type: actionTypes.GET_SINGLE_PRODUCT_INFO,
        payload,
    }
}
export function setSingleProductInfo(payload: any) {
    return {
        type: actionTypes.SET_SINGLE_PRODUCT_INFO,
        payload,
    }
}
