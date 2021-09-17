import { call, put, select, take } from "redux-saga/effects";
import { xRead, xSave } from "src/request";
import Router from "next/router";
import { action } from "redux-saga/store/actions";
import { IIdentity } from "../../constants";

export const SET_USER_INFO = 'SET_USER_INFO';

//LOGIN INTERFACE
export const BTN_LOGIN_CLICK = 'BTN_LOGIN_CLICK';


interface EmailAndPassword {
    userEmail: string;
    userPassword: string;
}

export const btnLoginClick = (payload: EmailAndPassword) => action(BTN_LOGIN_CLICK, { payload });
export const setUserInfo = (identity: IIdentity, token: string) => action(SET_USER_INFO, { identity, token });

export function* sagaLoginWatcher() {
    while (true) {
        const data = yield take(BTN_LOGIN_CLICK);
        const result = yield call(xSave, '/user/login', data.payload);
        if (result.success === true && result.response.error === false) {
            yield put(setUserInfo(result.response.identity.payload, result.response.identity.token))
            yield call(Router.push, '/');
        }
    }
}


export default function* sagas() {
    [
        call(sagaLoginWatcher),
    ]
}

