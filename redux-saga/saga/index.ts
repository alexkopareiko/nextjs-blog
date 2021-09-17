import { HYDRATE } from 'next-redux-wrapper';
import { xSave, xRead } from './../../src/request';
import { all, call, put, select, take } from "redux-saga/effects"
import { actionTypes, setUserInfo, } from "redux-saga/store/actions";
import { HTTP_METHOD } from '../../constants';
import Router from 'next/router';

export function* loginWatcher() {
    while (true) {
        const data = yield take(actionTypes.BTN_LOGIN_CLICK);
        const result = yield call(xSave, '/user/login', data.payload);
        if (result.success === true && result.response.error === false) {
            yield put(setUserInfo(result.response.identity.payload, result.response.identity.token))
            yield call(Router.push, '/');
        }
    }
}



export function* rootWatcher() {
    console.log('rootWatcher')
    yield all([
        call(loginWatcher),
        call(loginWatcher),



    ])
}