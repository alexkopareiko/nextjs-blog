import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/product')
export default class ProductModelController extends BaseContext {

    @route('/list') //Get all products
    @GET()
    getAllProductModels(req, res) {
        const { ProductModel, UserModel, CategoryModel, ReviewModel } = this.di;

        ProductModel.findAll(
            {
                include: [
                    {
                        model: CategoryModel,
                        as: 'category'
                    },
                    {
                        model: UserModel,
                        as: 'author'
                    },
                    {
                        model: ReviewModel,
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


    @route('/:id')     // Find a single ProductModel with an id
    @GET()
    findOne(req, res) {
        const { ProductModel, UserModel, CategoryModel, ReviewModel } = this.di;

        const id = req.params.id;
        ProductModel.findByPk(id, {
            include: [
                {
                    model: CategoryModel,
                    as: 'category'
                },
                {
                    model: UserModel,
                    as: 'author',
                    include: [
                        {
                            model: ReviewModel,
                            as: 'reviewsForOwner',
                            include: [
                                {
                                    model: UserModel,
                                    as: 'prodUser'
                                },
                            ],
                        }
                    ],
                },
                {
                    model: ReviewModel,
                    as: 'reviews',
                    include: [
                        {
                            model: UserModel,
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
                    message: "Error retrieving ProductModel with id=" + id
                });
            });
    };

}

