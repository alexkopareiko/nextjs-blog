import { route, GET } from 'awilix-express'; // or `awilix-router-core`
import { Request, Response } from "express";
import BaseContext from '../BaseContext';
@route('')
export default class RenderController extends BaseContext {

    @route('/product/:id')
    @GET()
    productPage(req: Request, res: Response) {
        return res.print('/product/[id]', { id: req.params.id });
    }

    @route('/')
    @GET()
    indexPage(req: Request, res: Response) {
        const { ProductService } = this.di;
        ProductService.getAllProducts()
            .then(data => {
                res.print('/index', {}, data);
            }).catch(e => res.print('/404'));
    }
}