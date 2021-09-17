import { SET_ALL_PRODUCTS, SET_PRODUCTS_INFO } from "redux-saga/saga/products";

const initialState = {
    items: []
};

function products(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS_INFO: {
            const newState = { ...state };
            return {
                ...state,
                items: action.products
            }
        }

        case SET_ALL_PRODUCTS: {
            return {
                ...state,
                items: action.products
            }
        }
        default:
            return state
    }
}

export default products;
