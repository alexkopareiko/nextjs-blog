import { SET_PRODUCTS_INFO, SET_SINGLE_PRODUCT_INFO } from "redux-saga/saga/products";

const initialState = {
    products: [],
    product: '',
}

function productReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS_INFO: {
            return {
                ...state,
                products: action.products
            }
        }
        case SET_SINGLE_PRODUCT_INFO: {
            return {
                ...state,
                product: action.product
            }
        }

        default:
            return state
    }
}

export default productReducer;
