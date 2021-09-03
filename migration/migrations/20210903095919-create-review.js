'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
    
    CREATE TABLE Reviews (
      revId int NOT NULL AUTO_INCREMENT,
      revFeedback text,
      prodUserId int DEFAULT NULL,
      ownerUserId int DEFAULT NULL,
      revRating enum('1','2','3','4','5') DEFAULT NULL,
      prodId int DEFAULT NULL,
      createdAt bigint DEFAULT NULL,
      updatedAt bigint DEFAULT NULL,
      PRIMARY KEY (revId),
      KEY idx_prodId_ownerUserId_prodUserId (prodId,ownerUserId),
      KEY fk_Reviews_Users_idx1 (ownerUserId,prodUserId),
      KEY fk_Reviews_Users_idx (prodUserId),
      CONSTRAINT fk_Reviews_OwnerUser FOREIGN KEY (ownerUserId) REFERENCES Users (userId) ON DELETE CASCADE,
      CONSTRAINT fk_Reviews_Products FOREIGN KEY (prodId) REFERENCES Products (prodId) ON DELETE CASCADE,
      CONSTRAINT fk_Reviews_Users FOREIGN KEY (prodUserId) REFERENCES Users (userId) ON DELETE SET NULL ON UPDATE RESTRICT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
 
    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reviews');
  }
};