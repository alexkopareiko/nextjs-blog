import { json, Sequelize } from 'sequelize';

const db = require("../models").default;
const Product = db.products;
const Category = db.categories;
const Review = db.reviews;

const User = db.users;
const Op = db.Sequelize.Op;


// Retrieve all Products from the database.
export const findAll = (req, res) => {
  Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

export const getAllProducts = async (req, res) => {

  let products = await Product.findAll({
    include: [
      {
        model: Category,
        as: 'category'
      },
      {
        model: User,
        as: 'author'
      },
      {
        model: Review,
        as: 'reviews',
        // attributes: [
        //   [Sequelize.fn('AVG', Sequelize.col('reviews.revRating')), 'avgRating'],
        // ],
        // group: ['Product.prodId', 'reviews.prodId'],
        // raw: true,
      },
    ],
    group: ['Product.prodId', 'reviews.revId'],
    //raw: true,
  });

  products = await JSON.parse(JSON.stringify(products))
  const list = [];
  await products.map(product => {
    let sum = 0;
    product.reviews.map(review => {
      sum += Number(review.revRating);
    })
    list.push({
      ...product,
      rating: Math.ceil(sum / product.reviews.length),
    })
  })

  return res.status(200).send(JSON.stringify(list));

}

// Find a single Product with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, {
    include: [
      {
        model: Category,
        as: 'category'
      },
      {
        model: User,
        as: 'author'
      },
      {
        model: Review,
        as: 'reviews',
      },
    ],
    group: ['Product.prodId', 'reviews.revId'],
  })
    .then(product => {
      product = JSON.parse(JSON.stringify(product))
      let sum = 0;
      product.reviews.map(review => {
        sum += Number(review.revRating);
      })
      res.send({
        ...product,
        rating: Math.ceil(sum / (product.reviews.length === 0 ? 1 : product.reviews.length))
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};