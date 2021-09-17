import { Action } from "redux";




export function action(type: string, payload = {}): Action {
    return { type, ...payload };
}



export const actionTypes = {
    IS_HYDRATED: 'IS_HYDRATED',

    //LOGIN_INTERFACE
    BTN_LOGIN_CLICK: 'BTN_LOGIN_CLICK',

    //userReducer
    SET_USER_INFO: 'SET_USER_INFO',

    HYDRATE: 'HYDRATE',

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
// export function getProductsInfo() {
//     return {
//         type: actionTypes.GET_PRODUCTS_INFO,
//     }
// }

