import { all, call, put, select, take } from "redux-saga/effects";

import { action } from "redux-saga/store/actions"
import { xRead } from "src/request";
import { IIdentity } from '../../constants';

export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';

export const getUsers = (prodId: number) => action(GET_USERS, { prodId });
export const setUsers = (users: Array<IIdentity>) => action(SET_USERS, { users });

export function* sagaGetUsers() {
    while (true) {
        const data = yield take(GET_USERS);
        const result = yield call(xRead, '/user/by_prod_id/' + data.prodId, {});
        if (result.success === true && result.response.error === false) {
            yield put(setUsers(result.response.data))
        }
    }
}

export default function* sagas() {
    yield all([
        call(sagaGetUsers),
    ])
}

