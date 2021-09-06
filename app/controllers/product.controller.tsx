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
  try {
    const products = await Product.findAll({
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
          as: 'reviews'
        },

      ]
    });
    return res.status(200).send(products);
  } catch (error: any) {
    console.log(error)
    return res.status(500).send(error.message);
  }
}

// Find a single Product with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};