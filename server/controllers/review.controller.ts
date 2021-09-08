import { users, reviews } from '../models';

// Retrieve all Reviews from the database.
export const findAll = (req, res) => {
  reviews.findAll()
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

  reviews.findByPk(id)
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

  reviews.findAll({
    include: [
      // {
      //   model: Product,
      //   as: 'product'
      // },
      {
        model: users,
        as: 'prodUser'
      },
    ],
    where: {
      prodId: id
    },
    //group: ['Review.revId'],
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