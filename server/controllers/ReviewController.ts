import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/review')
export default class ReviewController extends BaseContext {

    @route('/list') //Get all reviews
    @GET()
    getAllReviews(req, res) {
        const { Review } = this.di;
        Review.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving reviews."
                });
            });
    }

    @route('/:id') // Find a single Review with an id
    @GET()
    findOne(req, res) {
        const { Review } = this.di;
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



    @route('/byProdId/:id')     // Find a single Review by prodId
    @GET()
    findReviewsByProductId(req, res) {
        const id = req.params.id;
        const { Review, User } = this.di;
        Review.findAll({
            include: [
                {
                    model: User,
                    as: 'prodUser'
                },
            ],
            where: {
                prodId: id
            },
            //group: ['Reviews.revId'],
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

}

