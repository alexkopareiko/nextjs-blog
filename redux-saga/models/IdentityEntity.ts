import { call, put, select, take } from "redux-saga/effects"
import validator from 'validator';
import Router from "next/router";

import Entity from "./Entity";
import {  IIdentity } from "../../constants";
import { action } from "../store/actions"
import actionDec from '../decorators/action';



export const SET_USER_INFO = 'SET_USER_INFO';
export const LOGOUT = 'LOGOUT';
export const setUserInfo = (identity: IIdentity, token?: string) => action(SET_USER_INFO, { identity, token });
export const logout = () => action(LOGOUT);

class IdentityEntity extends Entity {
    constructor() {
        super();
    }
    @actionDec()
    public * sagaLogin(data) {
        if (validator.isEmail(data.userEmail) && data.userPasswd !== '') {
            const result = yield call(this.xSave, '/user/login', data);    
            if (result.success === true && result.response.error === false) {
                yield put(setUserInfo(result.response.data.payload, result.response.data.token))
                yield call(Router.push, '/');
            }
        }
    }

    @actionDec()
    public * sagaLogout() {
        const result = yield call(this.xRead, '/user/logout');    
            if (result.success === true && result.response.error === false) {
                yield put(logout())
                yield call(Router.push, '/');
                yield call(Router.reload);
            }
    }
}


const identityEntity = new IdentityEntity();
export default identityEntity;