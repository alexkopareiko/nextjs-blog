export default (sequelize: any, DataTypes: any) => {
  const Product = sequelize.define("Product", {

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

  return Product;
};