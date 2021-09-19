import { route, GET } from 'awilix-express' // or `awilix-router-core`
import BaseContext from '../BaseContext'

@route('/api/product')
export default class ProductModelController extends BaseContext {

    @route('/list') //Get all products
    @GET()
    getAllProducts(req, res) {
        const { ProductService } = this.di;
        return ProductService.getAllProducts()
            .then(data => {
                const answer = {
                    data: data,
                    message: "request successfull",
                    error: false
                }
                res.status(200).send(answer);
            })
            .catch(err => {
                const answer = {
                    data: null,
                    message: err,
                    error: true
                }
                return res.status(500).send(answer);
            });
    }

    @route('/all')
    @GET()
    findAll(req, res) {
        const { ProductModel } = this.di;
        return ProductModel.findAll()
            .then(data => {
                const answer = {
                    data: data,
                    message: "request successfull",
                    error: false
                }
                res.status(200).send(answer);
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


    @route('/:id')
    @GET()
    findAOne(req, res) {
        const { ProductModel } = this.di;
        const id = req.params.id;
        return ProductModel.findByPk(id)
            .then(data => {
                const answer = {
                    data: data,
                    message: "request successfull",
                    error: false
                }
                res.status(200).send(answer);
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



    // @route('/:id')     // Find a single ProductModel with an id
    // @GET()
    // findOne(req, res) {
    //     const { ProductService } = this.di;
    //     const id = req.params.id;
    //     return ProductService.findOne(id)
    //         .then(data => {
    //             const answer = {
    //                 data: data,
    //                 message: "request successfull",
    //                 error: false
    //             }
    //             res.status(200).send(answer);
    //         })
    //         .catch(err => {
    //             const answer = {
    //                 data: null,
    //                 message: err,
    //                 error: true
    //             }
    //             res.status(500).send(answer);
    //         });
    // };

}

