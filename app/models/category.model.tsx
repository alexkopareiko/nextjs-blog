import User from './user.model'
import Product from './product.model'

export default (sequelize: any, DataTypes: any) => {
  const Category = sequelize.define("Category", {
    catId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    catName: { type: DataTypes.STRING(45), allowNull: false },
    createdAt: { type: DataTypes.BIGINT },
    updatedAt: { type: DataTypes.BIGINT },
  });


  // Category.hasMany(Product,
  //   {
  //     foreignKey: 'catId', as: 'products',
  //   }
  // );

  return Category;
};