import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/user')
export default class UserController extends BaseContext {

    @route('/list') //Get all users
    @GET()
    getAllUsers(req, res) {
        const { User } = this.di;
        User.findAll()
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


    @route('/:id') // Find a single User with an id
    @GET()
    findOne(req, res) {
        const { User } = this.di;
        const id = req.params.id;
        User.findByPk(id)
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

