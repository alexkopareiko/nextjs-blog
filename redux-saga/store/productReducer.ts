import { GET_PRODUCTS_INFO, SET_SINGLE_PRODUCT_INFO } from "redux-saga/saga/products";

const initialState = {
    products: [],
    product: '',
}

function productReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_INFO: {
            return {
                ...state,
                products: action.payload
            }
        }
        case SET_SINGLE_PRODUCT_INFO: {
            return {
                ...state,
                product: action.payload
            }
        }

        default:
            return state
    }
}

export default productReducer;
