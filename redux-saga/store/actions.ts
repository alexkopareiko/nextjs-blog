export const actionTypes = {
    //LOGIN_INTERFACE
    BTN_LOGIN_CLICK: 'BTN_LOGIN_CLICK',

    //USER
    SET_USER_INFO: 'SET_USER_INFO',
}

export function btnLoginClick(data: any) {
    return {
        type: actionTypes.BTN_LOGIN_CLICK,
        data,
    }
}

export function setUserInfo(data: any) {
    return {
        type: actionTypes.SET_USER_INFO,
        data,
    }
}

