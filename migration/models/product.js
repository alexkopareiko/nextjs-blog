'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    prodId: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false,autoIncrement: true},
    prodTitle:{type: DataTypes.STRING(100), allowNull: false},
    prodDesc:{type: DataTypes.TEXT},
    catId:{
      type:DataTypes.INTEGER, defaultValue: NULL,
      references: {
        model: Category,
        key: 'catId',
      }   
    },
    userId:{
      type:DataTypes.INTEGER, allowNull: false,
      references: {
        model: User,
        key: 'userId',
      } 
    },
    prodPrice:{type:DataTypes.INTEGER},
    prodYear:{type:DataTypes.INTEGER},
    prodImg:{type: DataTypes.STRING(300)},
    createdAt : {type: DataTypes.BIGINT},
    updatedAt : {type: DataTypes.BIGINT},
  }, {
    sequelize,
    modelName: 'Product',
    indexes: [{ unique: true, fields: ['catId','userId'] }]

  });
  return Product;
};