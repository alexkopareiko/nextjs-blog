import { route, GET } from 'awilix-express' // or `awilix-router-core`
import httpStatus from '../../http-status';
import BaseContext from '../BaseContext'

@route('/api/product')
export default class ProductModelController extends BaseContext {

    @route('/list') //Get all products
    @GET()
    getAllProducts(req, res) {
        const { ProductService } = this.di;
        return ProductService.getAllProducts()
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get product list', httpStatus.BAD_REQUEST);
            });
    }

    @route('/all')
    @GET()
    findAll(req, res) {
        const { ProductModel } = this.di;
        return ProductModel.findAll()
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get product list', httpStatus.BAD_REQUEST);
            });
    };


    @route('/:id') //DON"T MOVE THIS THING UP !!!
    @GET()
    findOne(req, res) {
        const { ProductService } = this.di;
        const id = req.params.id;
        return ProductService.findOne(id)
            .then(data => {
                res.answer(data);
            })
            .catch(err => {
                res.answer(null, 'Could not get product', httpStatus.BAD_REQUEST);
            });
    };

    
}

