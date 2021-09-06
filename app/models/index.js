import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";

import Sequelize from "sequelize";
const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: _dialect,
  operatorsAliases: false,

  pool: {
    max: _pool.max,
    min: _pool.min,
    acquire: _pool.acquire,
    idle: _pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js").default(sequelize, Sequelize);
db.products = require("./product.model.js").default(sequelize, Sequelize);
db.categories = require("./category.model.js").default(sequelize, Sequelize);
db.reviews = require("./review.model.js").default(sequelize, Sequelize);

export default db;