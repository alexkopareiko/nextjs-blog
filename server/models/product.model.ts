import User from './user.model'
import Category from './category.model'

export default (sequelize: any, DataTypes: any) => {
  const Product = sequelize.define("Product", {
    prodId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    prodTitle: { type: DataTypes.STRING(100), allowNull: false },
    prodDesc: { type: DataTypes.TEXT },
    catId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Category,
      //   key: 'catId'
      // }
    },
    userId: {
      type: DataTypes.INTEGER, allowNull: false,
      // references: {
      //   model: User,
      //   key: 'userId'
      // }
    },
    prodPrice: { type: DataTypes.INTEGER },
    prodYear: { type: DataTypes.INTEGER, },
    prodImg: { type: DataTypes.STRING(300) },
    createdAt: { type: DataTypes.BIGINT },
    updatedAt: { type: DataTypes.BIGINT },
  });

  // Product.belongsTo(Category);
  // Product.belongsTo(User);


  return Product;
};