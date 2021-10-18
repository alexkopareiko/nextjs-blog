import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'
import { Request, Response } from "express";
import httpStatus from '../../http-status';

@route('/api/category')
export default class CategoryController extends BaseContext {

    @route('/list') //Get all categories
    @GET()
    getAllCategories(req: Request, res: Response) {
        const { CategoryService } = this.di;
        return CategoryService.getAllCategories()
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get category list', httpStatus.BAD_REQUEST);
            });

    }



    @route('/:id')     // Find a single Category with an id
    @GET()
    findOne(req, res) {
        const { CategoryService } = this.di;
        const id = req.params.id;
        return CategoryService.getCategoryById(id)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get category', httpStatus.BAD_REQUEST);
            });
    };

}

