import { IProduct } from "../../constants";
import { SET_ALL_PRODUCTS, SET_PRODUCT_BY_ID } from "redux-saga/saga/products";

interface IProductsState {
    items: Array<IProduct>
}

const initialState: IProductsState = {
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
            console.log('SET_ALL_PRODUCTS = ', action.products.length);
            return {
                ...state,
                items: [...action.products]
            }
        }
        case SET_PRODUCT_BY_ID: {
            return {
                ...state,
                items: [...state.items, action.product]
            }
        }


        default:
            console.log('old product state = ', action.type, state.items.length);
            return state
    }
}

export default products;
