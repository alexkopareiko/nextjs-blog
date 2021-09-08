import { categories } from '../models';

// Retrieve all Categories from the database.
export const findAll = (req, res) => {
  categories.findAll()
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

// Find a single Category with an id
export const findOne = (req, res) => {
  const id = req.params.id;

  categories.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Category with id=" + id
      });
    });
};