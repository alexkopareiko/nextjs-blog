import BaseContext from '../BaseContext'

export default class ProductService extends BaseContext {

    public findProductById(prodId: number) {
        const { ProductModel } = this.di;
        if (isNaN(prodId)) return Promise.reject('Parameter is not a number!');
        return ProductModel.findByPk(prodId)
    }

    public getAllProducts() {
        const { ProductModel, UserModel, CategoryModel, ReviewModel } = this.di;

        return ProductModel.findAll(
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
                return list;
            })
            .catch(err => {
                return err;
            })
    }

    public findOne(id: number) {
        const { ProductModel, UserModel, CategoryModel, ReviewModel, UserSeviceCustom } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        return ProductModel.findByPk(id, {
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
                const rating = product.reviews.length === 0 ? 0 : Math.ceil(sum / product.reviews.length);
                const users = JSON.parse(JSON.stringify(UserSeviceCustom.getUsersByProductId(id)));
                
                return {
                    ...product,
                    rating,
                    users
                };
            })
    };

}