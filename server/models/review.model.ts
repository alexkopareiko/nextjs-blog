export default (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    revId: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    revFeedback: { type: DataTypes.TEXT },
    ownerUserId: {
      type: DataTypes.INTEGER,
    },
    prodUserId: {
      type: DataTypes.INTEGER,
    },
    revRating: { type: DataTypes.INTEGER, defaultValue: '5' },
    prodId: {
      type: DataTypes.INTEGER,
    },
    createdAt: { type: DataTypes.BIGINT },
    updatedAt: { type: DataTypes.BIGINT },
  });

  return Review;
};