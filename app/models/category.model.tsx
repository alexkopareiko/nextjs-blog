export default (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    catId: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false,autoIncrement: true},
    catName: {type: DataTypes.STRING(45), allowNull: false},
    createdAt : {type: DataTypes.BIGINT},
    updatedAt : {type: DataTypes.BIGINT},
  });

  return Category;
};