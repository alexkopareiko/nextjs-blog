'use strict';
const times = require('lodash/times');
const faker = require('faker')
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    const items = [];
    const cats = ['Mac', 'iPad', 'iPhone', 'Apple Watch', 'Headphones'];
      times(5).map(i => {
        const item = {
          catName: cats[i],
          createdAt : Date.now()-Math.floor(Math.random()*4),
          updatedAt : Date.now()-Math.floor(Math.random()*4),
        };
        items.push(item);
      })
  
    
    return queryInterface.bulkInsert('Categories', items);

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};