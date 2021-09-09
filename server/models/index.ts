import { asFunction } from 'awilix';


import User, { UserType } from './UserModel';
import Product, { ProductType } from './ProductModel';
import Category, { CategoryType } from './CategoryModel';
import Review, { ReviewType } from './ReviewModel';

import { IContextContainer } from '../container';


export interface IModelContainer {
    initModels: () => void;
    User: UserType;
    Product: ProductType;
    Category: CategoryType;
    Review: ReviewType;
}

const initModels = (ctx: IContextContainer) => {
    const { User, Product, Category, Review } = ctx;
    return () => {
        User.initModels();
        Product.initModels();
        Category.initModels();
        Review.initModels();
    }
}

export default {
    initModels: asFunction(initModels).singleton(),
    User: asFunction(User).singleton(),
    Product: asFunction(Product).singleton(),
    Category: asFunction(Category).singleton(),
    Review: asFunction(Review).singleton(),
}
