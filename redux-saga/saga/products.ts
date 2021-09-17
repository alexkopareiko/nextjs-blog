import { IProduct } from "../../constants";
import { all, call, put, select, take } from "redux-saga/effects";
import { action } from "redux-saga/store/actions"
import { xRead } from "src/request";

export const GET_PRODUCTS_INFO = 'GET_PRODUCTS_INFO';
export const SET_PRODUCTS_INFO = 'SET_PRODUCTS_INFO';
export const GET_SINGLE_PRODUCT_INFO = 'GET_SINGLE_PRODUCT_INFO';
export const SET_SINGLE_PRODUCT_INFO = 'SET_SINGLE_PRODUCT_INFO';

export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';


const FIND_PRODUCT_BY_ID = 'FIND_PRODUCT_BY_ID';

export const findProductById = (id: string) => action(FIND_PRODUCT_BY_ID, { id });
// export const getProductsInfo = () => action(GET_PRODUCTS_INFO);
// export const setProductsInfo = (products: Array<IProduct>) => action(SET_PRODUCTS_INFO, { products });
export const getSingleProductInfo = (id: number) => action(GET_SINGLE_PRODUCT_INFO, { id });
export const setSingleProductInfo = (product: IProduct) => action(SET_SINGLE_PRODUCT_INFO, { product });

export const getAllProducts = () => action(GET_ALL_PRODUCTS);
export const setAllProducts = (products: Array<IProduct>) => action(SET_ALL_PRODUCTS, { products });




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

export function* sagaGetAndSetSingleProduct() { //unused
    console.log('sagaGetAndSetSingleProduct');
    while (true) {
        const data = yield take(GET_SINGLE_PRODUCT_INFO);
        const prodId = data.id;
        let product = yield select(state => state.product);
        if (product.prodId !== prodId && !isNaN(prodId)) {
            const result = yield call(xRead, '/product/' + prodId, {});
            if (result.success === true && result.response.error === false) {
                yield put(setSingleProductInfo(result.response.data))
            }
        }
    }
}

export function* sagaFindAllProducts() {
    console.log('sagaFindAllProducts');
    while (true) {
        yield take(GET_ALL_PRODUCTS);
        let products = yield select(state => state.products.items);
        if (products.length <= 0) {
            const result = yield call(xRead, '/product/all', {});
            if (result.success === true && result.response.error === false) {
                yield put(setAllProducts(result.response.data))
            }
        }
    }
}



export default function* sagas() {
    yield all([
        // call(sagaGetAndSetProducts),
        call(sagaGetAndSetSingleProduct),
        call(sagaFindAllProducts),

    ])
}

