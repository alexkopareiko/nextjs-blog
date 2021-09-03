'use strict';
const times = require('lodash/times');
const faker = require('faker')
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    
    
    const users = await queryInterface.sequelize.query("SELECT * FROM Users WHERE userRole = 'seller'", { type: QueryTypes.SELECT });
    const items = [
      {
        prodTitle:'MacBook Pro 2020 256GB Silver MXK62',
        prodDesc:faker.commerce.productDescription(),
        catId:'1',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/image/664x443/602f0fa2c1f0d1ba5e241f914e856ff9/s/i/silver-macbookpro-13-compressor_1.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'MacBook Pro 13 2020 1TB Space Gray MWP52',
        prodDesc:faker.commerce.productDescription(),
        catId:'1',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/image/664x443/602f0fa2c1f0d1ba5e241f914e856ff9/s/g/sg-macbookpro-13-compressor_3.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'iPad 10.2 Silver 32GB WiFi 2020',
        prodDesc:faker.commerce.productDescription(),
        catId:'2',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/s/i/silver_ipad-8-2020_wifi.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'iPad 10.2 Space Gray 32GB WiFi/4G 2020',
        prodDesc:faker.commerce.productDescription(),
        catId:'2',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/s/p/space_ipad-8-2020_wifi_2.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'iPhone 12 mini Product Red 64GB',
        prodDesc:faker.commerce.productDescription(),
        catId:'3',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/r/e/red_iphone-12-mini-for-site.png',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'iPhone 12 mini Purple 64GB',
        prodDesc:faker.commerce.productDescription(),
        catId:'3',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/p/u/purple_iphone-12-mini-for-site.png',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'Apple Watch Series 6 Edition 40mm 14-Karat White Gold Case',
        prodDesc:faker.commerce.productDescription(),
        catId:'4',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/a/w/aw-s6-2020-__white-gold-case_1.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'Apple Watch Series 6 Edition 40mm 14-Karat Gold with Black',
        prodDesc:faker.commerce.productDescription(),
        catId:'4',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/a/w/aw-s6-2020-__gold-with-black-case_1.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'Satechi Wireless Charging Pad Space',
        prodDesc:faker.commerce.productDescription(),
        catId:'5',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/s/p/spacegray2_1_43.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
      {
        prodTitle:'Hoco Metal Wireless Charger Brown',
        prodDesc:faker.commerce.productDescription(),
        catId:'5',
        userId:users[Math.floor(Math.random()*users.length)].userId,
        prodPrice:faker.finance.amount(),
        prodYear:'2020',
        prodImg:'https://yabloki.ua/media/catalog/product/cache/4/small_image/580x/9df78eab33525d08d6e5fb8d27136e95/g/r/gray1_3.jpg',
        createdAt : Date.now()-1000,
        updatedAt : Date.now()-1000,
      },
    ];
    
    return queryInterface.bulkInsert('Products', items);

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};