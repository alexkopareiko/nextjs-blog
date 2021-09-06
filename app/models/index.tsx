import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import { applyExtraSetup } from './extra-setup'
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,

  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.tsx").default(sequelize, Sequelize);
db.products = require("./product.model.tsx").default(sequelize, Sequelize);
db.categories = require("./category.model.tsx").default(sequelize, Sequelize);
db.reviews = require("./review.model.tsx").default(sequelize, Sequelize);

applyExtraSetup(db);

export default db;