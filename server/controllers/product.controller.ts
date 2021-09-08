import { users, products, categories, reviews } from '../models';

// Retrieve all Products from the database.
export const findAll = (req, res) => {
  products.findAll()
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

  let products_loc = await products.findAll({
    include: [
      {
        model: categories,
        as: 'category'
      },
      {
        model: users,
        as: 'author'
      },
      {
        model: reviews,
        as: 'reviews',
      },
    ],
    group: ['Product.prodId', 'reviews.revId'],
    //raw: true,
  });

  //console.log(JSON.stringify(products_loc))
  products_loc = await JSON.parse(JSON.stringify(products_loc))
  const list = [];
  await products_loc.map(product => {
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

  products.findByPk(id, {
    include: [
      {
        model: categories,
        as: 'category'
      },
      {
        model: users,
        as: 'author',
        include: [
          {
            model: reviews,
            as: 'reviewsForOwner',
            include: [
              {
                model: users,
                as: 'prodUser'
              },
            ],
          }
        ],
        //group: ['author.reviewsForOwner.revId'],
      },
      {
        model: reviews,
        as: 'reviews',
        include: [
          {
            model: users,
            as: 'prodUser'
          },
        ],
      },
    ],
    group: ['Product.prodId', 'reviews.revId', 'author.reviewsForOwner.revId'],
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
      console.log(err)

      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};