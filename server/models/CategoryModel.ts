import { Model, DataTypes, BuildOptions } from 'sequelize';

import { IContextContainer } from '../container';


interface ICategory extends Model {
    catId: number;
    catName: string;
    createdAt: number;
    updatedAt: number;
}


export type CategoryType = typeof Model & {
    new(values?: object, options?: BuildOptions): ICategory;
    initModels(): void;
}

export default (ctx: IContextContainer) => {

    const Category = <CategoryType>ctx.db.define('Categories', {
        catId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
        catName: { type: DataTypes.STRING(45), allowNull: false },
        createdAt: { type: DataTypes.BIGINT },
        updatedAt: { type: DataTypes.BIGINT },
    });

    Category.initModels = () => {

        Category.hasMany(ctx.Product, { as: 'category', foreignKey: 'catId' });

    }

    return Category;
};



