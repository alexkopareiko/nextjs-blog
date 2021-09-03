'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userId: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false,autoIncrement: true},
    userEmail: {type: DataTypes.STRING(45), allowNull: false},
    userPasswd: {type: DataTypes.STRING(45), allowNull: false},
    userRole: {type: DataTypes.STRING(45), allowNull: false, defaultValue: 'guest'},
    userImg: {type: DataTypes.STRING(300), defaultValue: NULL},
    userPhone: {type: DataTypes.STRING(45), defaultValue: NULL},
    userFirstName: {type: DataTypes.STRING(45), defaultValue: NULL},
    userLastName: {type: DataTypes.STRING(45), defaultValue: NULL},
    createdAt : {type: DataTypes.BIGINT, defaultValue: NULL},
    updatedAt : {type: DataTypes.BIGINT, defaultValue: NULL},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};