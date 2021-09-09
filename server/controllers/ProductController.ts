import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/product')
export default class ProductController extends BaseContext {

    @route('/list') //Get all products
    @GET()
    getAllProducts(req, res) {
        const { Product, User, Category, Review } = this.di;

        Product.findAll(
            {
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
                group: ['Products.prodId', 'reviews.revId'],
                //raw: true,
            })
            .then(data => {
                const products = JSON.parse(JSON.stringify(data))
                const list = [];
                products.map(product => {
                    let sum = 0;
                    product.reviews.map(review => {
                        sum += Number(review.revRating);
                    })
                    let rating = product.reviews.length === 0 ? 0 : Math.ceil(sum / product.reviews.length);
                    list.push({
                        ...product,
                        rating,
                    })
                })
                res.send(list);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            });
    }


    @route('/:id')     // Find a single Product with an id
    @GET()
    findOne(req, res) {
        const { Product, User, Category, Review } = this.di;

        const id = req.params.id;
        Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category'
                },
                {
                    model: User,
                    as: 'author',
                    include: [
                        {
                            model: Review,
                            as: 'reviewsForOwner',
                            include: [
                                {
                                    model: User,
                                    as: 'prodUser'
                                },
                            ],
                        }
                    ],
                },
                {
                    model: Review,
                    as: 'reviews',
                    include: [
                        {
                            model: User,
                            as: 'prodUser'
                        },
                    ],
                },
            ],
            group: ['Products.prodId', 'reviews.revId', 'author.reviewsForOwner.revId'],
        })
            .then(product => {
                product = JSON.parse(JSON.stringify(product))
                let sum = 0;
                product.reviews.map(review => {
                    sum += Number(review.revRating);
                })
                let rating = product.reviews.length === 0 ? 0 : Math.ceil(sum / product.reviews.length);
                res.send({
                    ...product,
                    rating
                });
            })
            .catch(err => {
                console.log(err)
                res.status(500).send({
                    message: "Error retrieving Product with id=" + id
                });
            });
    };

}

