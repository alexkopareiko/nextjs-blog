import { all, call, put, select, take } from "redux-saga/effects";
import { xRead, xSave } from "src/request";
import Router from "next/router";
import { action } from "redux-saga/store/actions";
import { IIdentity } from "../../constants";

export const SET_USER_INFO = 'SET_USER_INFO';

//LOGIN INTERFACE
export const BTN_LOGIN_CLICK = 'BTN_LOGIN_CLICK';


interface EmailAndPassword {
    userEmail: string;
    userPasswd: string;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const btnLoginClick = (payload: EmailAndPassword) => action(BTN_LOGIN_CLICK, { payload });
export const setUserInfo = (identity: IIdentity, token: string) => action(SET_USER_INFO, { identity, token });

export function* sagaLoginWatcher() {
    while (true) {
        let identity = yield select(state => state.userReducer);
        const data = yield take(BTN_LOGIN_CLICK);
        if (identity.userToken === '') {
            if (validateEmail(data.payload.userEmail) && data.payload.userPasswd !== '') {
                const result = yield call(xSave, '/user/login', data.payload);
                if (result.success === true && result.response.error === false) {
                    yield put(setUserInfo(result.response.identity.payload, result.response.identity.token))
                    yield call(() => (Router.push, '/'));
                }
            }
        }
    }
}

export default function* sagas() {
    yield all([
        call(sagaLoginWatcher),
    ])
}

