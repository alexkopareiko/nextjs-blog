import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/user')
export default class UserController extends BaseContext {

    @route('/list') //Get all users
    @GET()
    getAllUsers(req, res) {
        const { UserModel } = this.di;
        UserModel.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving users."
                });
            });
    }


    @route('/:id') // Find a single UserModel with an id
    @GET()
    findOne(req, res) {
        const { UserModel } = this.di;
        const id = req.params.id;
        UserModel.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving User with id=" + id
                });
            });

    };

}

