import { call, take } from "redux-saga/effects"
import { action } from "../store/actions"
import { ENTITIES } from "../../constants";
import Entity from "./Entity"
import reviewEntity from "./ReviewEntity"
import userEntity from "./UserEntity"

export const GET_ALL_PROPERTIES = 'GET_ALL_PROPERTIES';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';

export const getAllProducts = () => action(GET_ALL_PROPERTIES);
export const getProductById = (id: number) => action(GET_PRODUCT_BY_ID, { id });

class ProductEntity extends Entity {
    constructor() {
        super(ENTITIES.PRODUCTS, {
            author: userEntity.getSchema(),
            reviews: [reviewEntity.getSchema()],
        });
        this.sagaGetAllProducts = this.sagaGetAllProducts.bind(this);
        this.sagaGetProductById = this.sagaGetProductById.bind(this);
        Entity.addAction(this.sagaGetAllProducts);
        Entity.addAction(this.sagaGetProductById);
    }


    public * sagaGetAllProducts() {
        while (true) {
            yield take(GET_ALL_PROPERTIES);
            yield call(this.xRead, '/product/list');
        }
    }

    public * sagaGetProductById() {
        while (true) {
            const data = yield take(GET_PRODUCT_BY_ID);
            const id = data.id;
            yield call(this.xRead, '/product/' + id);

        }
    }
}

const productEntity = new ProductEntity();
export default productEntity;