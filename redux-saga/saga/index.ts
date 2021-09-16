import { xSave } from './../../src/request';
import { all, call, put, take, takeLatest } from "redux-saga/effects"
import { actionTypes, setUserInfo } from "redux-saga/store/actions";
import { handleClickBtnWatcher } from "./handleClickBtn";
import { loadDataSaga } from "./loadData";


export function* loginWatcher() {
    console.log('init BTN_LOGIN_CLICK')
    while (true) {
        const data = yield take(actionTypes.BTN_LOGIN_CLICK)
        const result = yield call(xSave, '/user/login', data.data);
        console.log(result)
        // if (result.success === true && result.response.errors === false) {
        //     yield put(setUserInfo(result.response.identity.payload))
        // }

    }
}

export function* rootWatcher() {
    console.log('rootWatcher')
    yield all([
        call(loginWatcher)
    ])
}