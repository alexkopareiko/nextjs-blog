import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { ENTITIES } from "../../constants";
import Entity from "./Entity";
import userEntity from "./UserEntity";

class ReviewEntity extends Entity {
    constructor() {
        super(ENTITIES.REVIEWS, {
            prodUser: userEntity.getSchema(),
        }, { idAttribute: 'revId' });
    }

    public * sagaGetAllReviews() {
        while (true) {
            yield take('sagaGetAllReviews');
            yield call(this.xRead, '/review/list');
        }
    }

    public * sagaGetReviewById() {
        while (true) {
            const data = yield take('sagaGetReviewById');
            const id = data.id;
            yield call(this.xRead, '/review/' + id);

        }
    }

    public * sagaGetReviewsByProductId() {
        while (true) {
            const data = yield take('sagaGetReviewsByProductId');
            const prodId = data.prodId;
            if (!isNaN(prodId)) {
                yield call(this.xRead, '/review/by_prod_id/' + prodId, {});
            }
        }
    }
}

const reviewEntity = new ReviewEntity();
export default reviewEntity;