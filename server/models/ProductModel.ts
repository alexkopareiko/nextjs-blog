import { Model, DataTypes, BuildOptions } from 'sequelize';

import { IContextContainer } from '../container';


interface IProduct extends Model {
    userId: number;

    createdAt: number;
    updatedAt: number;
}


export type ProductType = typeof Model & {
    new(values?: object, options?: BuildOptions): IProduct;
    initModels(): void;
}

export default (ctx: IContextContainer) => {

    const Product = <ProductType>ctx.db.define('Products', {
        prodId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true
        },

        prodTitle: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        prodDesc: {
            type: DataTypes.TEXT
        },

        catId: {
            type: DataTypes.INTEGER,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        prodPrice: { type: DataTypes.INTEGER },
        prodYear: { type: DataTypes.INTEGER, },
        prodImg: { type: DataTypes.STRING(300) },
        createdAt: { type: DataTypes.BIGINT },
        updatedAt: { type: DataTypes.BIGINT },
    });

    Product.initModels = () => {


    }

    return Product;
};



