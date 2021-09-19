import { IReview } from "../../constants";
import { SET_REVIEWS_BY_PRODUCT_ID } from "redux-saga/saga/reviews";

interface IReviewsState {
    items: Array<IReview>
}

const initialState: IReviewsState = {
    items: []
};

function products(state = initialState, action) {
    switch (action.type) {
        case SET_REVIEWS_BY_PRODUCT_ID: {
            return {
                ...state,
                items: action.reviews
            }
        }
        default:
            return state
    }
}

export default products;
