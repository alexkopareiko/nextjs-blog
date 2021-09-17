import { actionTypes } from './actions'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    products: [],
    product: '',
}

function productReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS_INFO: {
            return {
                ...state,
                products: action.payload
            }
        }
        case actionTypes.SET_SINGLE_PRODUCT_INFO: {
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
