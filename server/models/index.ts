import { asFunction } from 'awilix';


import User, { UserType } from './UserModel';
import Product, { ProductType } from './ProductModel';

import { IContextContainer } from '../container';


export interface IModelContainer {
    initModels: () => void;
    User: UserType;
    Product: ProductType;
}

const initModels = (ctx: IContextContainer) => {
    const { User, Product } = ctx;
    return () => {
        User.initModels();
        Product.initModels();
    }
}

export default {
    initModels: asFunction(initModels).singleton(),
    User: asFunction(User).singleton(),
    Product: asFunction(Product).singleton(),
}
