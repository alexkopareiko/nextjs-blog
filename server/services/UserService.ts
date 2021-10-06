import BaseContext from '../BaseContext'
import { Op } from 'sequelize';

export default class UserService extends BaseContext {
    public getAllUsers() {
        const { UserModel } = this.di;
        return UserModel.findAll({})
    }

    public getUserById(id: number) {
        const { UserModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        return UserModel.findByPk(id)
    }

    public getUserByEmail(email: string) {
        const { UserModel } = this.di;
        function validateEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }
        if (!validateEmail(email)) return Promise.reject('Parameter is not an email!');
        return UserModel.findOne({
            where: { userEmail: email }
        })
    };

    public getUserByToken(token: string) {
        const { UserModel } = this.di;
        if (token.trim() === "") return Promise.reject('Wrong token');
        return UserModel.findOne(
            {
                attributes: [
                    'userFirstName', 'userLastName', 'userImg'
                ],
                where: { userToken: token }
            })
    };

    public async getUsersByProductId(prodId: number) {
        const { UserModel, ProductService, ReviewService } = this.di;
        if (isNaN(prodId)) return Promise.reject('Parameter is not a number!');
        const product = await ProductService.findProductById(prodId);
        const reviews = await ReviewService.findReviewsByProductId(prodId);
        const reviewsForOwner = await ReviewService.findReviewsByUserOwnerId(product.userId);
        
        // const userIDs = [
        //     product.userId,
        // ];
        // reviews.reduce((a, v) => { a.push(v.prodUserId) } , [ product.userId ]);

        // const arr = reviews.reduce(function (carry, item) {
        //     carry.push(item['prodUserId']);
        //     return carry;
        // }, []);

        const userIDs = [
            product.userId,
        ]
        reviews.map(r => userIDs.push(r.prodUserId));
        reviewsForOwner.map(r => userIDs.push(r.ownerUserId));
        
        let unique = [...new Set(userIDs)];
        return UserModel.findAll(
            {
                // attributes: [
                //     'userFirstName', 'userLastName', 'userImg'
                // ],
                // where: {
                //     userId: unique
                // }
            })
    };


}