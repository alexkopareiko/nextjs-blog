'use strict';
const times = require('lodash/times');
const faker = require('faker')
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const items = [];
    const usersOwners = await queryInterface.sequelize.query("SELECT * FROM Users WHERE userRole = 'seller'", { type: QueryTypes.SELECT });
    const usersCustomers = await queryInterface.sequelize.query("SELECT * FROM Users WHERE userRole = 'customer'", { type: QueryTypes.SELECT });
    const products = await queryInterface.sequelize.query("SELECT * FROM Products", { type: QueryTypes.SELECT });
    


    products.map(i => {
        let ownerUserId = usersOwners[Math.floor(Math.random()*usersOwners.length)].userId;
        let prodUserId = usersCustomers[Math.floor(Math.random()*usersCustomers.length)].userId;
    
        // const productsByOwner = await queryInterface.sequelize.query("SELECT * FROM Products WHERE userId LIKE :ownerUserId", { 
        //   replacements: { ownerUserId: ownerUserId },
        //   type: QueryTypes.SELECT 
        // });

        let getProduct = (ownerUserId)=>{
          let arr = [];
          products.map(p=>{
            if(p.userId===ownerUserId) arr.push(p.prodId);
          })
          if(arr.length!==0) return arr[Math.floor(Math.random()*arr.length)];
          else return null;
        }
      
        const item = {
          revFeedback:Math.floor(Math.random() * 2)?faker.commerce.productDescription():'',
          ownerUserId:ownerUserId,
          prodUserId:prodUserId,
          revRating:Math.floor(Math.random() * 5) + 1,
          prodId:getProduct(ownerUserId),
          createdAt : Date.now()-1000,
          updatedAt : Date.now()-1000,
        };
        items.push(item);
      })
  
    
    return queryInterface.bulkInsert('Reviews', items);

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};