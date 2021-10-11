import { call, take } from "redux-saga/effects"
import { ENTITIES } from "../../constants";
import Entity from "./Entity"
import reviewEntity from "./ReviewEntity"
import userEntity from "./UserEntity"
import categoryEntity from "./CategoryEntity";
import actionDecor from '../decorators/action';

class ProductEntity extends Entity {
    constructor() {
        super(ENTITIES.PRODUCTS, {
            author: userEntity.getSchema(),
            users: [userEntity.getSchema()],
            reviews: [reviewEntity.getSchema()],
            category: categoryEntity.getSchema(),
        }, { idAttribute: 'prodId' });

    }

    @actionDecor()
    public * sagaGetAllProducts() {
        while (true) {
            yield take('sagaGetAllProducts');
            
            yield call(this.xRead, '/product/list');
        }
    }
    
    public * sagaGetProductById() {
        while (true) {
            const data = yield take('sagaGetProductById');
            const id = data.id;
            yield call(this.xRead, '/product/' + id);
            
        }
    }
    
    // public sagaGetAllProducts() {
    //     return {
    //         'method': this.xRead,
    //         'params': '/product/list',
    //         'postfix': ''
    //     }
    // }

    // public sagaGetProductById() {
    //     return {
    //         'method': this.xRead,
    //         'params': '/product/',
    //         'postfix': 'id'
    //     }
    // }
}

const productEntity = new ProductEntity();
export default productEntity;