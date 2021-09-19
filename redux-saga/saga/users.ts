import { all, call, put, select, take } from "redux-saga/effects";

import { action } from "redux-saga/store/actions"
import { xRead } from "src/request";
import { IIdentity } from '../../constants';

export const GET_USERS = 'GET_USERS';
export const SET_USERS = 'SET_USERS';

export const getUsers = () => action(GET_USERS);
export const setUsers = (users: Array<IIdentity>) => action(SET_USERS, { users });

export function* sagaGetUsers() {
    while (true) {
        yield take(GET_USERS);
        let users = yield select(state => state.users.items);
        const result = yield call(xRead, '/user/list', {});
        if (result.success === true && result.response.error === false) {
            const araysAreSame = JSON.stringify(users) === JSON.stringify(result.response.data);
            if (!araysAreSame) {
                yield put(setUsers(result.response.data))
            }
        }
    }
}

export default function* sagas() {
    yield all([
        call(sagaGetUsers),
    ])
}

