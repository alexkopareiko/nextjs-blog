import { route, GET, POST } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'
import { NextFunction, Request, Response } from "express";
const LocalStrategy = require('passport-local').Strategy;
import passport from 'passport';



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


    @POST()
    @route('/register')
    public register(req: Request, res: Response, next: NextFunction) {
        let { passportCustom } = this.di;
        return passportCustom.authenticate('local-signup', (errors, identity) => {
            if (identity) {
                res.json({
                    identity,
                    message: 'Registration completed successfully!!! You can now log in.'
                })
            } else {
                res.status(301).json({
                    identity: null,
                    message: 'Could not process register'
                })
            }
        })(req, res, next);
    }

    // @POST()
    // @route('/login')
    // public login(req: Request, res: Response, next: NextFunction) {
    //     const { passport } = this.di;
    //     return passport.authenticate('local-login', (errors, identity) => {
    //         if (errors) {
    //             console.warn('/login in UserController ', errors)
    //         } else if (identity) {
    //             console.log('/login ', identity)
    //         }
    //     })(req, res, next);

    // }

}

