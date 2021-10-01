import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { ENTITIES } from "../../constants";
import Entity from "./Entity";

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_CATEGORY_BY_ID = 'GET_CATEGORY_BY_ID';

export const getAllCategories = () => action(GET_ALL_CATEGORIES);
export const getCategoryById = (id: number) => action(GET_CATEGORY_BY_ID, { id });

class CategoryEntity extends Entity {
    constructor() {
        super(ENTITIES.CATEGORIES, {});
        this.sagaGetAllCategories = this.sagaGetAllCategories.bind(this);
        this.sagaGetCategoryById = this.sagaGetCategoryById.bind(this);
        Entity.addAction(this.sagaGetAllCategories);
        Entity.addAction(this.sagaGetCategoryById);
    }

    public * sagaGetAllCategories() {
        while (true) {
            yield take(GET_ALL_CATEGORIES);
            yield call(this.xRead, '/user/list');
        }
    }

    public * sagaGetCategoryById() {
        while (true) {
            const data = yield take(GET_CATEGORY_BY_ID);
            const id = data.id;
            yield call(this.xRead, '/user/' + id);

        }
    }
}

const categoryEntity = new CategoryEntity();
export default categoryEntity;