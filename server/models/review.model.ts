import User from './user.model'
import Product from './product.model'

export default (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    revId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    revFeedback: { type: DataTypes.TEXT },
    ownerUserId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
      //   key: 'userId',
      // }
    },
    prodUserId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: User,
      //   key: 'userId',
      // }
    },
    revRating: { type: DataTypes.INTEGER, defaultValue: '5' },
    prodId: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Product,
      //   key: 'prodId',
      // }
    },
    createdAt: { type: DataTypes.BIGINT },
    updatedAt: { type: DataTypes.BIGINT },
  });

  return Review;
};