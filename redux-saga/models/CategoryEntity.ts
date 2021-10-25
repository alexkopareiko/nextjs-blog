import { call } from "redux-saga/effects"

import Entity from "./Entity";
import { ENTITIES } from "../../constants";
import action from '../decorators/action';

class CategoryEntity extends Entity {
    constructor() {
        super(ENTITIES.CATEGORIES, {}, { idAttribute: 'catId' });

    }

    @action()
    public * sagaGetAllCategories() {
            yield call(this.xRead, '/category/list');
    }

    @action()
    public * sagaGetCategoryById(data) {
            yield call(this.xRead, '/category/' + data.id);
    }
}

const categoryEntity = new CategoryEntity();
export default categoryEntity;