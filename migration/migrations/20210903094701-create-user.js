'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`

    CREATE TABLE Users (
      userId int NOT NULL AUTO_INCREMENT,
      userEmail varchar(45) NOT NULL,
      userPasswd varchar(45) NOT NULL,
      userRole enum('admin','customer','seller','guest') NOT NULL DEFAULT 'guest',
      userPhone varchar(45) DEFAULT NULL,
      userFirstName varchar(45) DEFAULT NULL,
      userLastName varchar(45) DEFAULT NULL,
      userImg varchar(300) DEFAULT NULL,
      createdAt bigint DEFAULT NULL,
      updatedAt bigint DEFAULT NULL,
      PRIMARY KEY (userId),
      UNIQUE KEY idx_user_email_last_name (userEmail,userLastName)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};