import ProductModel from 'server/models/ProductModel';
import BaseContext from '../BaseContext'

export default class ReviewService extends BaseContext {
    public getAllReviews() {
        const { ReviewModel } = this.di;
        return ReviewModel.findAll()
    }

    public getReviewById(id: number) {
        const { ReviewModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        return ReviewModel.findByPk(id)
    }

    public findReviewsByProductId(id: number) {
        const { ReviewModel, UserModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        const result = ReviewModel.findAll({
            // include: [
            //     {
            //         model: UserModel, 
            //         as: 'prodUser'
            //     },
            // ],
            where: {
                prodId: id
            },
        })
        return result;
    }
    public findUserReviewsByProductId(id: number) {
        const { ReviewModel, UserModel, ProductModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        const result = ReviewModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'prodUser'
                },
                {
                    model: ProductModel,
                    as: 'prodUser'
                },
            ],
            where: {
                prodId: id
            },
        })
        return result;
    }
}