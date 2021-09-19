import { SET_ALL_PRODUCTS, SET_PRODUCT_BY_ID } from "redux-saga/saga/products";

const initialState = {
    items: []
};

function products(state = initialState, action) {
    switch (action.type) {
        // case SET_PRODUCTS_INFO: {
        //     const newState = { ...state };
        //     return {
        //         ...state,
        //         items: action.products
        //     }
        // }

        case SET_ALL_PRODUCTS: {
            return {
                ...state,
                items: action.products
            }
        }
        case SET_PRODUCT_BY_ID: {
            return {
                ...state,
                items: [...state.items, action.product]
            }
        }


        default:
            return state
    }
}

export default products;
