import { call, take } from "redux-saga/effects"
import { ENTITIES } from "../../constants";
import Entity from "./Entity"
import reviewEntity from "./ReviewEntity"
import userEntity from "./UserEntity"
import categoryEntity from "./CategoryEntity";
import action from '../decorators/action';

class ProductEntity extends Entity {
    constructor() {
        super(ENTITIES.PRODUCTS, {
            author: userEntity.getSchema(),
            users: [userEntity.getSchema()],
            reviews: [reviewEntity.getSchema()],
            category: categoryEntity.getSchema(),
        }, { idAttribute: 'prodId' });

    }

    @action()
    public * sagaGetAllProducts() {
        yield call(this.xRead, '/product/list');
    }

    @action()
    public * sagaGetProductById(data) {
        yield call(this.xRead, '/product/' + data.id);
    }
}

const productEntity = new ProductEntity();
export default productEntity;