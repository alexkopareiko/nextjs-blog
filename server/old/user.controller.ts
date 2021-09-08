import { users, products, categories, reviews } from '../models';

// Retrieve all Users from the database.
export const findAll = (req, res) => {
  console.log()
  users.findAll()
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

// Find a single User with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  users.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};