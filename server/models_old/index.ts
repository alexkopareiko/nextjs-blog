import { Sequelize } from 'sequelize';

import usersModel from './user.model';
import productsModel from './product.model';
import categoriesModel from './category.model';
import reviewsModel from './review.model';

import config from '../../config.js';
const { database, username, password, host, dialect } = config.db;

const sequelize = new Sequelize(database, username, password, { host, dialect });

export const users = usersModel(sequelize, Sequelize);
export const products = productsModel(sequelize, Sequelize);
export const categories = categoriesModel(sequelize, Sequelize);
export const reviews = reviewsModel(sequelize, Sequelize);

let singelton = false;

export const initModels = () => {

    if (!singelton) {
        console.log('INIT MODELS !!!!');
        singelton = true;
        categories.hasMany(products, { as: 'category', foreignKey: 'catId' });
        users.hasMany(products, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });
        users.hasMany(reviews, { as: 'prodUser', foreignKey: 'prodUserId', onDelete: 'SET NULL' });
        users.hasMany(reviews, { as: 'reviewsForOwner', foreignKey: 'ownerUserId', onDelete: '' });

        products.belongsTo(users, { as: 'author', foreignKey: 'userId', onDelete: 'cascade' });
        products.belongsTo(categories, { as: 'category', foreignKey: 'catId' });
        products.belongsTo(reviews, { as: 'product', foreignKey: 'prodId', onDelete: 'cascade' });
        products.hasMany(reviews, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });

        reviews.belongsTo(products, { as: 'reviews', foreignKey: 'prodId', onDelete: 'cascade' });
        reviews.hasMany(products, { as: 'product', foreignKey: 'prodId', onDelete: 'cascade' });
        reviews.belongsTo(users, { as: 'prodUser', foreignKey: 'prodUserId', onDelete: 'SET NULL' });
        reviews.belongsTo(users, { as: 'reviewsForOwner', foreignKey: 'ownerUserId', onDelete: '' });
    }

}

