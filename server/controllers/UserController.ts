import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'
import { Request, Response } from "express";

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

}

