'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`

    CREATE TABLE Products (
      prodId int NOT NULL AUTO_INCREMENT,
      prodTitle varchar(100) NOT NULL,
      prodDesc text,
      catId int DEFAULT NULL,
      userId int NOT NULL,
      prodPrice int DEFAULT NULL,
      prodYear int DEFAULT NULL,
      prodImg varchar(300) DEFAULT NULL,
      createdAt bigint DEFAULT NULL,
      updatedAt bigint DEFAULT NULL,
      PRIMARY KEY (prodId),
      KEY idx_cat_user (catId,userId),
      KEY fk_Products_1_idx (userId),
      CONSTRAINT fk_Products_Categories FOREIGN KEY (catId) REFERENCES Categories (catId) ON DELETE SET NULL,
      CONSTRAINT fk_Products_Users FOREIGN KEY (userId) REFERENCES Users (userId) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};