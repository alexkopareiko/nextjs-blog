import { route, GET } from 'awilix-express' // or `awilix-router-core`
import { Request, Response } from "express";

import BaseContext from '../BaseContext'

@route('')
export default class RenderController extends BaseContext {
    @GET()
    @route('/')
    indexPage(req: Request, res: Response) {
        console.log('indexPage');
        return res.print('/index');
    }

    @GET()
    @route('/product/:id')
    productPage(req: Request, res: Response) {
        console.log('productPage');
        return res.print('/product/[id]', { id: req.params.id });
    }
}

