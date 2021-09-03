'use strict';
const times = require('lodash/times');
const faker = require('faker')
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    const items = [];
    const roles = ['admin', 'customer', 'seller', 'guest'];
      times(20).map(i => {
        const item = {
          userEmail: faker.internet.email(),
          userPasswd: faker.internet.password(),
          userRole: roles[Math.floor(Math.random()*roles.length)],
          userImg: faker.image.avatar(),
          userPhone: faker.phone.phoneNumber(),
          userFirstName: faker.name.firstName(),
          userLastName: faker.name.lastName(),
          createdAt : Date.now()-Math.floor(Math.random()*4),
          updatedAt : Date.now()-Math.floor(Math.random()*4),
        };
        items.push(item);
      })
  
    
    return queryInterface.bulkInsert('Users', items);

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};