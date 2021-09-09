import * as  awilix from 'awilix';
import UserSeviceCustom from './UserService';
import CategoryService from './CategoryService'
import ReviewService from './ReviewService'
import ProductService from './ProductService'

export interface IServiceContainer {
    UserSeviceCustom: UserSeviceCustom;
    CategoryService: CategoryService;
    ReviewService: ReviewService;
    ProductService: ProductService;
}
export default {
    UserSeviceCustom: awilix.asClass(UserSeviceCustom).singleton(),
    CategoryService: awilix.asClass(CategoryService).singleton(),
    ReviewService: awilix.asClass(ReviewService).singleton(),
    ProductService: awilix.asClass(ProductService).singleton(),
}
