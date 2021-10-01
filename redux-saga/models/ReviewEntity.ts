import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { ENTITIES } from "../../constants";
import Entity from "./Entity";
import userEntity from "./UserEntity";

export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
export const GET_REVIEW_BY_ID = 'GET_REVIEW_BY_ID';
export const GET_REVIEWS_BY_PRODUCT_ID = 'GET_REVIEWS_BY_PRODUCT_ID';

export const getAllReviews = () => action(GET_ALL_REVIEWS);
export const getReviewById = (id: number) => action(GET_REVIEW_BY_ID, { id });
export const getReviewsByProductId = (prodId: number) => action(GET_REVIEWS_BY_PRODUCT_ID, { prodId });

class ReviewEntity extends Entity {
    constructor() {
        super(ENTITIES.REVIEWS, {
            prodUser: userEntity.getSchema(),
        });
        this.sagaGetAllReviews = this.sagaGetAllReviews.bind(this);
        this.sagaGetReviewById = this.sagaGetReviewById.bind(this);
        this.sagaGetReviewsByProductId = this.sagaGetReviewsByProductId.bind(this);
        Entity.addAction(this.sagaGetAllReviews);
        Entity.addAction(this.sagaGetReviewById);
        Entity.addAction(this.sagaGetReviewsByProductId);
    }


    public * sagaGetAllReviews() {
        while (true) {
            yield take(GET_ALL_REVIEWS);
            yield call(this.xRead, '/review/');
        }
    }

    public * sagaGetReviewById() {
        while (true) {
            const data = yield take(GET_REVIEW_BY_ID);
            const id = data.id;
            yield call(this.xRead, '/review/' + id);

        }
    }

    public * sagaGetReviewsByProductId() {
        while (true) {
            const data = yield take(GET_REVIEWS_BY_PRODUCT_ID);
            const prodId = data.prodId;
            if (!isNaN(prodId)) {
                yield call(this.xRead, '/review/by_prod_id/' + prodId, {});
            }
        }
    }
}

const reviewEntity = new ReviewEntity();
export default reviewEntity;