'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Category.init({
    prodId: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false,autoIncrement: true},
    catName: {type: DataTypes.STRING(45), allowNull: false},
    createdAt : {type: DataTypes.BIGINT},
    updatedAt : {type: DataTypes.BIGINT},
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};