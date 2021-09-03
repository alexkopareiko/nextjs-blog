'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`

    CREATE TABLE Categories (
      catId int NOT NULL AUTO_INCREMENT,
      catName varchar(45) NOT NULL,
      PRIMARY KEY (catId),
      KEY idx_cat_name (catName)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
   
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Categories');
  }
};