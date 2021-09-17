import { HYDRATE } from 'next-redux-wrapper';
import { xSave, xRead } from './../../src/request';
import { all, call, put, select, take } from "redux-saga/effects"
import { actionTypes, setProductsInfo, setSingleProductInfo, setUserInfo, isHydrated } from "redux-saga/store/actions";
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

export function* getAndSetProducts() {
    console.log('getAndSetProducts')
    while (true) {
        yield take(actionTypes.GET_PRODUCTS_INFO);
        let products = yield select(state => state.productReducer.products);
        if (products.length <= 0) {
            console.log('GET_PRODUCTS_INFO !!!!');
            const result = yield call(xRead, '/product/list', {});
            if (result.success === true && result.response.error === false) {
                yield put(setProductsInfo(result.response.data))
            }
        }
    }
}
export function* getAndSetSingleProduct() {
    while (true) {
        const data = yield take(actionTypes.GET_SINGLE_PRODUCT_INFO);
        const prodId = data.payload;
        const result = yield call(xRead, '/product/' + prodId, {});
        if (result.success === true && result.response.error === false) {
            yield put(setSingleProductInfo(result.response.data))
        }
    }
}



export function* rootWatcher() {
    console.log('rootWatcher')
    yield all([
        call(loginWatcher),
        call(getAndSetProducts),
        call(getAndSetSingleProduct),


    ])
}