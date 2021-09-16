import { route, GET, POST } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'
import { NextFunction, Request, Response } from "express";



@route('/api/user')
export default class UserController extends BaseContext {

    @route('/list') //Get all users
    @GET()
    getAllUsers(req: Request, res: Response) {
        const { UserSeviceCustom } = this.di;
        return UserSeviceCustom.getAllUsers()
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

    }




    @route('/by_email/:email') // Find a single UserModel with an email
    @GET()
    getUserByEmail(req, res) {
        const { UserSeviceCustom } = this.di;
        const email = req.params.email;
        return UserSeviceCustom.getUserByEmail(email)
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

    @route('/by_token') // Find a single UserModel with token
    @GET()
    getUserByToken(req, res) {
        const { UserSeviceCustom, JwtStrategy } = this.di;
        const token = JwtStrategy.getJwtFromRequest(req);
        return UserSeviceCustom.getUserByToken(token)
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

    @route('/register')
    @POST()
    public register(req: Request, res: Response, next: NextFunction) {
        let { passportCustom } = this.di;
        return passportCustom.authenticate('local-signup', (errors, identity) => {
            if (identity) {
                return res.json({
                    identity,
                    message: 'Registration completed successfully!!! You can now log in.',
                    error: false
                })
            } else {
                return res.status(301).json({
                    identity: null,
                    message: 'Could not process register',
                    error: errors
                })
            }
        })(req, res, next);
    }

    @POST()
    @route('/login')
    public login(req: Request, res: Response, next: NextFunction) {
        const { passportCustom } = this.di;
        return passportCustom.authenticate('local-login', (errors: any, identity) => {
            if (errors) {
                return res.json({
                    identity: null,
                    message: 'Could not process validations',
                    error: errors
                })
            } else if (identity) {

                res.cookie('token', identity.token, { maxAge: 1000606024 });
                return res
                    .json({
                        identity,
                        message: 'You have successfully logged in!',
                        error: false
                    })

            }
        })(req, res, next);

    }


    // DON'T MOVE THIS THING UP !!!
    @route('/:id') // Find a single UserModel with an id
    @GET()
    findOne(req, res) {
        const { UserSeviceCustom } = this.di;
        const id = req.params.id;
        return UserSeviceCustom.getUserById(id)
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

