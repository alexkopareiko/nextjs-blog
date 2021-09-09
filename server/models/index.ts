import { asFunction } from 'awilix';


import UserModel, { UserType } from './UserModel';
import ProductModel, { ProductType } from './ProductModel';
import CategoryModel, { CategoryType } from './CategoryModel';
import ReviewModel, { ReviewType } from './ReviewModel';

import { IContextContainer } from '../container';


export interface IModelContainer {
    initModels: () => void;
    UserModel: UserType;
    ProductModel: ProductType;
    CategoryModel: CategoryType;
    ReviewModel: ReviewType;
}

const initModels = (ctx: IContextContainer) => {
    const { UserModel, ProductModel, CategoryModel, ReviewModel } = ctx;
    return () => {
        UserModel.initModels();
        ProductModel.initModels();
        CategoryModel.initModels();
        ReviewModel.initModels();
    }
}

export default {
    initModels: asFunction(initModels).singleton(),
    UserModel: asFunction(UserModel).singleton(),
    ProductModel: asFunction(ProductModel).singleton(),
    CategoryModel: asFunction(CategoryModel).singleton(),
    ReviewModel: asFunction(ReviewModel).singleton(),
}
