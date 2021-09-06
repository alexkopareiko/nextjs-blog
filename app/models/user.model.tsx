import Product from './product.model'


export default (sequelize: any, DataTypes: any) => {
  const User = sequelize.define("User", {
    userId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    userEmail: { type: DataTypes.STRING(45), allowNull: false },
    userPasswd: { type: DataTypes.STRING(45), allowNull: false },
    userRole: { type: DataTypes.STRING(45), allowNull: false, defaultValue: 'guest' },
    userImg: { type: DataTypes.STRING(300), },
    userPhone: { type: DataTypes.STRING(45), },
    userFirstName: { type: DataTypes.STRING(45), },
    userLastName: { type: DataTypes.STRING(45), },
    createdAt: { type: DataTypes.BIGINT, },
    updatedAt: { type: DataTypes.BIGINT, },
  });

  // User.hasMany(Product,
  //      {
  //     foreignKey: 'userId',
  //     as: 'products',
  //     onDelete: 'CASCADE',
  //   }
  // );

  return User;
};