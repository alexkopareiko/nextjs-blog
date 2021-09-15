import { all, call, takeLatest } from "redux-saga/effects"
import { actionTypes } from "redux-saga/store/actions";
import { loadDataSaga } from "./loadData";


export function* rootWatcher() {
    yield all([
        takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
    ])
}