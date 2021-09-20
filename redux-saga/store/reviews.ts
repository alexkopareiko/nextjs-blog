import { IReview } from "../../constants";
import { SET_REVIEWS_BY_PRODUCT_ID, SET_REVIEWS_BY_OWNER_ID } from "redux-saga/saga/reviews";

interface IReviewsState {
    items: Array<IReview>,
    itemsForOwner: Array<IReview>,
}

const initialState: IReviewsState = {
    items: [],
    itemsForOwner: []
};

function products(state = initialState, action) {
    switch (action.type) {
        case SET_REVIEWS_BY_PRODUCT_ID: {
            return {
                ...state,
                items: action.reviews
            }
        }
        // case SET_REVIEWS_BY_OWNER_ID: {
        //     return {
        //         ...state,
        //         itemsForOwner: action.reviews
        //     }
        // }
        default:
            return state
    }
}

export default products;
