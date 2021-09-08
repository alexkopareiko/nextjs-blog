import { categories, users, reviews } from './../models/index';
import bodyParser from 'body-parser'
import { route, GET, POST, before } from 'awilix-express' // or `awilix-router-core`
import { asClass } from 'awilix';


@route('/product')
export default class ProductController {
    products
    categories
    users
    reviews
    constructor({ Product, Category, User, Review }) {
        this.products = Product;
        this.categories = Category;
        this.users = User;
        this.reviews = Review;
    }

    @route('/list')
    @GET()
    getAllProducts(req, res) {
        this.products.findAll(
            {
                include: [
                    {
                        model: this.categories,
                        as: 'category'
                    },
                    {
                        model: this.users,
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

}