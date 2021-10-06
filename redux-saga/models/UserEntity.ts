import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { ENTITIES } from "../../constants";
import Entity from "./Entity";
import reviewEntity from "./UserEntity";
class UserEntity extends Entity {
    constructor() {
        super(ENTITIES.USERS, {
            //reviewsForOwner: [reviewEntity.getSchema()],
        }, { idAttribute: 'userId' });
    }


    // public * sagaGetAllUsers() {
    //     while (true) {
    //         yield take('sagaGetAllUsers');
    //         yield call(this.xRead, '/user/list');
    //     }
    // }

    // public * sagaGetUserById() {
    //     while (true) {
    //         const data = yield take('sagaGetUserById');
    //         const id = data.id;
    //         yield call(this.xRead, '/user/' + id);

    //     }
    // }

    // public * sagaGetUsersByProductId() {
    //     while (true) {
    //         const data = yield take('sagaGetUsersByProductId');
    //         const prodId = data.prodId;
    //         if (!isNaN(prodId)) {
    //             yield call(this.xRead, '/user/by_prod_id/' + prodId, {});
    //         }
    //     }
    // }
}

const userEntity = new UserEntity();
export default userEntity;