import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { IIdentity, ENTITIES } from "../../constants";
import Entity from "./Entity";
import reviewEntity from "./UserEntity";

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_PRODUCT_ID = 'GET_USER_BY_PRODUCT_ID';

export const getAllUsers = () => action(GET_ALL_USERS);
export const getUserById = (id: number) => action(GET_USER_BY_ID, { id });
export const getUsersByProductId = (prodId: number) => action(GET_USER_BY_PRODUCT_ID, { prodId });

class UserEntity extends Entity {
    constructor() {
        super(ENTITIES.USERS, {
            reviewsForOwner: [reviewEntity.getSchema()],
        });
        this.sagaGetAllUsers = this.sagaGetAllUsers.bind(this);
        this.sagaGetUserById = this.sagaGetUserById.bind(this);
        this.sagaGetUsersByProductId = this.sagaGetUsersByProductId.bind(this);
        Entity.addAction(this.sagaGetAllUsers);
        Entity.addAction(this.sagaGetUserById);
        Entity.addAction(this.sagaGetUsersByProductId);
    }


    public * sagaGetAllUsers() {
        while (true) {
            yield take(GET_ALL_USERS);
            yield call(this.xRead, '/user/list');
        }
    }

    public * sagaGetUserById() {
        while (true) {
            const data = yield take(GET_USER_BY_ID);
            const id = data.id;
            yield call(this.xRead, '/user/' + id);

        }
    }

    public * sagaGetUsersByProductId() {
        while (true) {
            const data = yield take(GET_USER_BY_PRODUCT_ID);
            const prodId = data.prodId;
            if (!isNaN(prodId)) {
                yield call(this.xRead, '/user/by_prod_id/' + prodId, {});
            }
        }
    }
}

const userEntity = new UserEntity();
export default userEntity;