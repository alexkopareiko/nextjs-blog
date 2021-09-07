const db = require("../models").default;
const Review = db.reviews;
const Op = db.Sequelize.Op;
const User = db.users;
const Product = db.products;

// Retrieve all Reviews from the database.
export const findAll = (req, res) => {
  Review.findAll()
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

// Find a single Review with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  Review.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Review with id=" + id
      });
    });
};


// Find a single Product with an id
export const findReviewsByProductId = (req, res) => {
  const id = req.params.id;

  Review.findAll({
    // include: [
    //   {
    //     model: Product,
    //     as: 'product'
    //   },
    // ],
    // group: ['Review.revId'],
  })
    .then(review => {
      res.send({
        review
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Reviews with prodId=" + id
      });
    });
};