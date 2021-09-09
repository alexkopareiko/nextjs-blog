import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'
import { Request, Response } from "express";

@route('/api/category')
export default class CategoryController extends BaseContext {

    @route('/list') //Get all categories
    @GET()
    getAllCategories(req: Request, res: Response) {
        const { CategoryService } = this.di;
        return CategoryService.getAllCategories()
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



    @route('/:id')     // Find a single Category with an id
    @GET()
    findOne(req, res) {
        const { CategoryService } = this.di;
        const id = req.params.id;
        return CategoryService.getCategoryById(id)
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

