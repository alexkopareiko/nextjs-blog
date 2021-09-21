import { reviewSchema } from './reviews';
import { IProduct } from "../../constants";
import { all, call, put, select, take } from "redux-saga/effects";
import { action, setAllData } from "redux-saga/store/actions"
import { xRead } from "src/request";
import { userSchema } from "./users";
import { normalize, schema } from 'normalizr';



export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const SET_PRODUCT_BY_ID = 'SET_PRODUCT_BY_ID';

export const getAllProducts = () => action(GET_ALL_PRODUCTS);
export const setAllProducts = (products: Array<IProduct>) => action(SET_ALL_PRODUCTS, { products });
export const getProductById = (id: number) => action(GET_PRODUCT_BY_ID, { id });
export const setProductById = (product: IProduct) => action(SET_PRODUCT_BY_ID, { product });

export const productSchema = new schema.Entity('products', {
    author: userSchema,
    reviews: [reviewSchema]
});

export function* sagaGetAllProducts() {
    while (true) {
        yield take(GET_ALL_PRODUCTS);
        let products = yield select(state => state.products.items);
        const result = yield call(xRead, '/product/all', {});
        if (result.success === true && result.response.error === false) {
            if (products.length !== result.response.data.length) {

                yield put(setAllData(result.response.data))
            }
        }
    }
}

// export function* sagaGetProductById() {
//     while (true) {
//         const data = yield take(GET_PRODUCT_BY_ID);
//         const prodId = data.id;
//         const products = yield select(state => state.products.items);
//         let product = undefined;
//         if (!isNaN(prodId)) {
//             if (products.length !== 0) {
//                 product = products.find(p => {
//                     return Number(p.prodId) === Number(prodId)
//                 })
//             }
//             if (product === undefined) {
//                 const result = yield call(xRead, '/product/' + prodId, {});
//                 if (result.success === true && result.response.error === false) {
//                     yield put(setProductById(result.response.data))
//                 }
//             }
//         }
//     }
// }

export default function* sagas() {
    yield all([
        // call(sagaGetProductById),
        call(sagaGetAllProducts),
    ])
}

