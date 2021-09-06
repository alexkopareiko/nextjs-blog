'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Review.init({
    revId: {primaryKey: true, type: DataTypes.INTEGER, allowNull: false,autoIncrement: true},
    revFeedback:{type: DataTypes.TEXT},
    ownerUserId:{
      type:DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId',
      } 
    },
    prodUserId:{
      type:DataTypes.INTEGER,
      references: {
        model: User,
        key: 'userId',
      } 
    },
    revRating:{type:DataTypes.INTEGER, defaultValue: '5'},
    prodId:{
      type:DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'prodId',
      } 
    },
    createdAt : {type: DataTypes.BIGINT},
    updatedAt : {type: DataTypes.BIGINT},
  }, {
    sequelize,
    modelName: 'Review',
    indexes: [{ unique: true, fields: ['prodId','ownerUserId','prodUserId'] }]
  });
  return Review;
};