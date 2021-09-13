import { Model, DataTypes, BuildOptions } from 'sequelize';

import { IContextContainer } from '../container';


export interface IReview extends Model {
    revId: number;
    revFeedback: string;
    ownerUserId: number;
    prodUserId: number;
    revRating: number;
    prodId: number;
    createdAt: number;
    updatedAt: number;
}


export type ReviewType = typeof Model & {
    new(values?: object, options?: BuildOptions): IReview;
    initModels(): void;
}

export default (ctx: IContextContainer) => {

    const Review = <ReviewType>ctx.db.define('Reviews', {
        revId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
        revFeedback: { type: DataTypes.TEXT },
        ownerUserId: {
            type: DataTypes.INTEGER,
        },
        prodUserId: {
            type: DataTypes.INTEGER,
        },
        revRating: { type: DataTypes.INTEGER, defaultValue: '5' },
        prodId: {
            type: DataTypes.INTEGER,
        },
        createdAt: { type: DataTypes.BIGINT },
        updatedAt: { type: DataTypes.BIGINT },
    },
        {
            timestamps: false
        }
    );

    Review.initModels = () => {

        Review.belongsTo(ctx.ProductModel, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });
        Review.hasMany(ctx.ProductModel, { as: 'product', foreignKey: 'prodId', onDelete: 'cascade' });
        Review.belongsTo(ctx.UserModel, { as: 'prodUser', foreignKey: 'prodUserId', onDelete: 'SET NULL' });
        Review.belongsTo(ctx.UserModel, { as: 'reviewsForOwner', foreignKey: 'ownerUserId', onDelete: '' });

    }

    return Review;
};



