import { Model, DataTypes, BuildOptions } from 'sequelize';

import { IContextContainer } from '../container';
import { IReview } from './ReviewModel';



interface IProduct extends Model {
    prodId: number;
    prodTitle: string;
    prodDesc: string;
    catId: number;
    userId: number;
    prodPrice: number;
    prodYear: number;
    prodImg: string;
    createdAt: number;
    updatedAt: number;
    reviews: Array<IReview>
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

        Product.belongsTo(ctx.User, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });
        Product.belongsTo(ctx.Category, { as: 'category', foreignKey: 'catId' });
        Product.belongsTo(ctx.Review, { as: 'product', foreignKey: 'prodId', onDelete: 'cascade' });
        Product.hasMany(ctx.Review, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });

    }

    return Product;
};



