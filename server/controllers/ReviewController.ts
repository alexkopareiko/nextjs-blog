import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/review')
export default class ReviewController extends BaseContext {

    @route('/list') //Get all reviews
    @GET()
    getAllReviews(req, res) {
        const { ReviewService } = this.di;
        return ReviewService.getAllReviews()
            .then(data => {
                const answer = {
                    data: data,
                    message: "reviews are found successfully",
                    error: false
                }
                res.send(answer);
            })
            .catch(err => {
                const answer = {
                    data: null,
                    message: err,
                    error: true
                }
                res.status(500).send(answer);
            });
    }

    @route('/:id') // Find a single Review with an id
    @GET()
    findOne(req, res) {
        const { ReviewService } = this.di;
        const id = req.params.id;
        return ReviewService.getReviewById(id)
            .then(data => {
                const answer = {
                    data: data,
                    message: "request successfull",
                    error: false
                }
                res.send(answer);
            })
            .catch(err => {
                const answer = {
                    data: null,
                    message: err,
                    error: true
                }
                res.status(500).send(answer);
            });
    };



    @route('/by_prod_id/:id')     // Find Reviews by prodId
    @GET()
    findReviewsByProductId(req, res) {
        const id = req.params.id;
        const { ReviewService } = this.di;
        return ReviewService.findReviewsByProductId(id)
            .then(data => {
                const answer = {
                    data: data,
                    message: "request successfull",
                    error: false
                }
                res.send(answer);
            })
            .catch(err => {
                const answer = {
                    data: null,
                    message: err,
                    error: true
                }
                res.status(500).send(answer);
            });
    };

}

