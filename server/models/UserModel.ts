import bcrypt from "bcrypt";
import { Model, DataTypes, BuildOptions } from 'sequelize';

import { IContextContainer } from '../container';

export interface IUser extends Model {
  userId?: number;
  userEmail: string;
  userPasswd?: string;
  userRole?: string;
  userPhone?: string;
  userFirstName?: string;
  userLastName?: string;
  userImg?: string;
  userToken?: string;
  createdAt?: number;
  updatedAt?: number;
}


export type UserType = typeof Model & {
  new(values?: object, options?: BuildOptions): IUser;
  initModels(): void;
}

export default (ctx: IContextContainer) => {

  const User = <UserType>ctx.db.define('Users', {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },

    userEmail: {
      type: DataTypes.STRING(45),
      allowNull: false
    },

    userPasswd: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    userRole: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'guest'
    },

    userImg: {
      type: DataTypes.STRING(300),
    },

    userPhone: {
      type: DataTypes.STRING(45),
    },

    userFirstName: {
      type: DataTypes.STRING(45),
    },

    userLastName: {
      type: DataTypes.STRING(45),
    },

    userToken: {
      type: DataTypes.STRING(300),
      allowNull: true,
      unique: true,
    },

    createdAt: {
      type: DataTypes.BIGINT,
    },

    updatedAt: {
      type: DataTypes.BIGINT,
    },
  });

  User.beforeSave(async User => {
    try {
      if (User.changed('userPasswd')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(User.userPasswd, salt);
        User.userPasswd = hash;
      }

      User.updatedAt = Date.now() / 1000;
      if (User.isNewRecord) {
        User.createdAt = Date.now() / 1000;
      }

    } catch (err: any) {
      throw new Error(err);
    }
  });

  User.initModels = () => {

    User.hasMany(ctx.ProductModel, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });
    User.hasMany(ctx.ReviewModel, { as: 'prodUser', foreignKey: 'prodUserId', onDelete: 'SET NULL' });
    User.hasMany(ctx.ReviewModel, { as: 'reviewsForOwner', foreignKey: 'ownerUserId', onDelete: '' });
  }

  return User;
};



