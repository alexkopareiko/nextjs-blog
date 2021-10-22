import { route, GET, POST } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'
import { NextFunction, Request, Response } from "express";
import httpStatus from '../../http-status';



@route('/api/user')
export default class UserController extends BaseContext {

    @route('/list') //Get all users
    @GET()
    getAllUsers(req: Request, res: Response) {
        const { UserSeviceCustom } = this.di;
        return UserSeviceCustom.getAllUsers()
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get list of users', httpStatus.BAD_REQUEST);
            });

    }



    @route('/by_email/:email') // Find a single UserModel with an email
    @GET()
    getUserByEmail(req, res) {
        const { UserSeviceCustom } = this.di;
        const email = req.params.email;
        return UserSeviceCustom.getUserByEmail(email)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get user by email', httpStatus.BAD_REQUEST);
            });
    };


    @route('/by_prod_id/:id') // Find Users by product Id
    @GET()
    getUsersByProductId(req, res) {
        const { UserSeviceCustom } = this.di;
        const prodId = req.params.id;
        return UserSeviceCustom.getUsersByProductId(prodId)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get users by product id', httpStatus.BAD_REQUEST);
            });
    };

    @route('/register')
    @POST()
    register(req: Request, res: Response, next: NextFunction) {
        let { passportCustom } = this.di;
        return passportCustom.authenticate('local-signup', (errors, identity) => {
            if (identity) {
                return res.answer(identity, 'Registration completed successfully! You can now log in.');
            } else {
                return res.answer(null, 'Could not register', httpStatus.BAD_REQUEST);
            }
        })(req, res, next);
    }

    @POST()
    @route('/login')
    login(req: Request, res: Response, next: NextFunction) {
        const { passportCustom } = this.di;
        return passportCustom.authenticate('local-login', (errors: any, identity) => {
            if (errors) {
                return res.answer(null, 'Could not process validations', httpStatus.BAD_REQUEST);

            } else if (identity) {
                res.cookie('token', identity.token, { maxAge: 1000606024 });
                return res.answer(identity, 'You have successfully logged in!');
            }
        })(req, res, next);
    }

    @GET()
    @route('/logout')
    logout(req: Request, res: Response, next: NextFunction) {
        const { passportCustom, UserSeviceCustom } = this.di;
        passportCustom.authenticate('local-jwt', async (errors: any, identity) => {
            if (errors) {
                return res.answer(null, 'Could not authorized', httpStatus.UNAUTHORIZED);
            } else if (identity) {
                res.clearCookie("token");
                const user = await UserSeviceCustom.getUserById(identity.userId)
                if (user) {
                    user.userToken = '';
                    user.save();
                    return res.answer(null, 'successfully logged out');
                }
                else {
                    return res.answer(null, 'User not found', httpStatus.BAD_REQUEST);

                }
            }
        })(req, res, next);
    }

    // DON'T MOVE THIS THING UP !!!
    // @route('/:id') // Find a single UserModel with an id
    // @GET()
    // findOne(req, res) {
    //     const { UserSeviceCustom } = this.di;
    //     const id = req.params.id;
    //     return UserSeviceCustom.getUserById(id)
    //         .then(data => {
    //             return res.answer(data);

    //         })
    //         .catch(err => {
    //             return res.answer(null, 'User not found', httpStatus.BAD_REQUEST);
    //         });
    // };

}

