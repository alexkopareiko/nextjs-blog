import { IProduct } from "../../constants";
import { all, call, put, select, take } from "redux-saga/effects";
import { action } from "redux-saga/store/actions"
import { xRead } from "src/request";

// export const GET_PRODUCTS_INFO = 'GET_PRODUCTS_INFO';
// export const SET_PRODUCTS_INFO = 'SET_PRODUCTS_INFO';
// export const GET_SINGLE_PRODUCT_INFO = 'GET_SINGLE_PRODUCT_INFO';
// export const SET_SINGLE_PRODUCT_INFO = 'SET_SINGLE_PRODUCT_INFO';

// export const getProductsInfo = () => action(GET_PRODUCTS_INFO);
// export const setProductsInfo = (products: Array<IProduct>) => action(SET_PRODUCTS_INFO, { products });
// export const getSingleProductInfo = (id: number) => action(GET_SINGLE_PRODUCT_INFO, { id });
// export const setSingleProductInfo = (product: IProduct) => action(SET_SINGLE_PRODUCT_INFO, { product });

export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const SET_PRODUCT_BY_ID = 'SET_PRODUCT_BY_ID';

export const getAllProducts = () => action(GET_ALL_PRODUCTS);
export const setAllProducts = (products: Array<IProduct>) => action(SET_ALL_PRODUCTS, { products });
export const getProductById = (id: number) => action(GET_PRODUCT_BY_ID, { id });
export const setProductById = (product: IProduct) => action(SET_PRODUCT_BY_ID, { product });

// export function* sagaGetAndSetProducts() { //unused
//     console.log('getAndSetProducts')
//     while (true) {
//         yield take(GET_PRODUCTS_INFO);
//         let products = yield select(state => state.products);
//         if (products.length <= 0) {
//             console.log('GET_PRODUCTS_INFO !!!!');
//             const result = yield call(xRead, '/product/list', {});
//             if (result.success === true && result.response.error === false) {
//                 yield put(setProductsInfo(result.response.data))
//             }
//         }
//     }
// }

// export function* sagaGetAndSetSingleProduct() { //unused
//     console.log('sagaGetAndSetSingleProduct');
//     while (true) {
//         const data = yield take(GET_SINGLE_PRODUCT_INFO);
//         const prodId = data.id;
//         let product = yield select(state => state.product);
//         if (product.prodId !== prodId && !isNaN(prodId)) {
//             const result = yield call(xRead, '/product/' + prodId, {});
//             if (result.success === true && result.response.error === false) {
//                 yield put(setSingleProductInfo(result.response.data))
//             }
//         }
//     }
// }

export function* sagaGetAllProducts() {
    while (true) {
        yield take(GET_ALL_PRODUCTS);
        let products = yield select(state => state.products.items);
        const result = yield call(xRead, '/product/all', {});
        if (result.success === true && result.response.error === false) {
            if (products.length !== result.response.data.length) {
                yield put(setAllProducts(result.response.data))
            }
        }
    }
}

export function* sagaGetProductById() {
    while (true) {
        const data = yield take(GET_PRODUCT_BY_ID);
        const prodId = data.id;
        const products = yield select(state => state.products.items);
        let product = undefined;
        if (!isNaN(prodId)) {
            if (products.length !== 0) {
                product = products.find(p => {
                    return Number(p.prodId) === Number(prodId)
                })
            }
            if (product === undefined) {
                const result = yield call(xRead, '/product/' + prodId, {});
                if (result.success === true && result.response.error === false) {
                    yield put(setProductById(result.response.data))
                }
            }
        }
    }
}

export default function* sagas() {
    yield all([
        call(sagaGetProductById),
        call(sagaGetAllProducts),
    ])
}

