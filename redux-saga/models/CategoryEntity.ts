import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { ENTITIES } from "../../constants";
import Entity from "./Entity";
class CategoryEntity extends Entity {
    constructor() {
        super(ENTITIES.CATEGORIES, {}, { idAttribute: 'catId' });

    }

    public * sagaGetAllCategories() {
        while (true) {
            yield take('sagaGetAllCategories');
            yield call(this.xRead, '/category/list');
        }
    }

    public * sagaGetCategoryById() {
        while (true) {
            const data = yield take('sagaGetCategoryById');
            const id = data.id;
            yield call(this.xRead, '/category/' + id);

        }
    }
}

const categoryEntity = new CategoryEntity();
export default categoryEntity;