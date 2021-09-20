import { all, call, put, select, take } from "redux-saga/effects";

import { IReview } from "../../constants";
import { action } from "redux-saga/store/actions"
import { xRead } from "src/request";

export const GET_REVIEWS_BY_PRODUCT_ID = 'GET_REVIEWS_BY_PRODUCT_ID';
export const SET_REVIEWS_BY_PRODUCT_ID = 'SET_REVIEWS_BY_PRODUCT_ID';
export const SET_REVIEWS_BY_OWNER_ID = 'SET_REVIEWS_BY_OWNER_ID';

export const getReviewsByProductId = (prodId: number) => action(GET_REVIEWS_BY_PRODUCT_ID, { prodId });
export const setReviewsByProductId = (reviews: Array<IReview>) => action(SET_REVIEWS_BY_PRODUCT_ID, { reviews });
// export const setReviewsByOwnerId = (reviews: Array<IReview>) => action(SET_REVIEWS_BY_OWNER_ID, { reviews });

export function* sagaGetReviewsByProductId() {
    while (true) {
        const data = yield take(GET_REVIEWS_BY_PRODUCT_ID);
        const prodId = data.prodId;
        if (!isNaN(prodId)) {
            let reviews = yield select(state => state.reviews.items);
            const result = yield call(xRead, '/review/by_prod_id/' + prodId, {});
            if (result.success === true && result.response.error === false) {
                const araysAreSame = JSON.stringify(reviews) === JSON.stringify(result.response.data);
                if (!araysAreSame) {
                    yield put(setReviewsByProductId(result.response.data))
                }
            }
            // const resultForOwner = yield call(xRead, '/review/for_owner_by_prod_id/' + prodId, {});
            // if (resultForOwner.success === true && resultForOwner.response.error !== true) {
            //     {
            //         yield put(setReviewsByOwnerId(resultForOwner.response.data.author.reviewsForOwner))
            //     }
            // }
        }
    }
}
export default function* sagas() {
    yield all([
        call(sagaGetReviewsByProductId),
    ])
}

