import { route, GET } from 'awilix-express' // or `awilix-router-core`

import httpStatus from '../../http-status';
import BaseContext from '../BaseContext'

@route('/api/review')
export default class ReviewController extends BaseContext {

    @route('/list') //Get all reviews
    @GET()
    getAllReviews(req, res) {
        const { ReviewService } = this.di;
        return ReviewService.getAllReviews()
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get review list', httpStatus.BAD_REQUEST);
            });
    }

    @route('/:id') // Find a single Review with an id
    @GET()
    findOne(req, res) {
        const { ReviewService } = this.di;
        const id = req.params.id;
        return ReviewService.getReviewById(id)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get review by id', httpStatus.BAD_REQUEST);
            });
    };



    @route('/by_prod_id/:id')     // Find Reviews by prodId
    @GET()
    findReviewsByProductId(req, res) {
        const id = req.params.id;
        const { ReviewService } = this.di;
        return ReviewService.findReviewsByProductId(id)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get reviews by product id', httpStatus.BAD_REQUEST);
            });
    };

    @route('/for_owner_by_prod_id/:id')     // Find Reviews for Owner by prodId
    @GET()
    findUserReviewsByProductId(req, res) {
        const id = req.params.id;
        const { ReviewService } = this.di;
        return ReviewService.findUserReviewsByProductId(id)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get reviews for owner by product id', httpStatus.BAD_REQUEST);
            });
    };

}

