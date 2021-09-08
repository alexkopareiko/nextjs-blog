import { route, GET, POST, before } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/product')
export default class ProductController extends BaseContext {

    @route('/list') //Get all products
    @GET()
    getAllProducts(req, res) {
        const { Product, User } = this.di;

        Product.findAll(
            {
                include: [
                    {
                        model: this.categories,
                        as: 'category'
                    },
                    {
                        model: User,
                        as: 'author'
                    },
                    {
                        model: this.reviews,
                        as: 'reviews',
                    },
                ],
                group: ['Product.prodId', 'reviews.revId'],
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
        const id = req.params.id;
        this.products.findByPk(id, {
            include: [
                {
                    model: this.categories,
                    as: 'category'
                },
                {
                    model: this.users,
                    as: 'author',
                    include: [
                        {
                            model: this.reviews,
                            as: 'reviewsForOwner',
                            include: [
                                {
                                    model: this.users,
                                    as: 'prodUser'
                                },
                            ],
                        }
                    ],
                },
                {
                    model: this.reviews,
                    as: 'reviews',
                    include: [
                        {
                            model: this.users,
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

