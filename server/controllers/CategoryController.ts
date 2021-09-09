import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/category')
export default class CategoryController extends BaseContext {

    @route('/list') //Get all categories
    @GET()
    getAllCategories(req, res) {

        const { CategoryModel } = this.di;
        CategoryModel.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving categories."
                });
            });
    }



    @route('/:id')     // Find a single Category with an id
    @GET()
    findOne(req, res) {
        const { CategoryModel } = this.di;
        const id = req.params.id;
        CategoryModel.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Category with id=" + id
                });
            });

    };

}

