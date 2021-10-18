import { route, GET } from 'awilix-express' // or `awilix-router-core`
import { Request, Response } from "express";

import { app } from '../index'
import BaseContext from '../BaseContext'

@route('')
export default class RenderController extends BaseContext {
    @GET()
    @route('/')
    indexPage(req: Request, res: Response) {
        console.log('indexPage');
        return app.render(req, res, '/index')
    }

    @GET()
    @route('/product/:id')
    productPage(req: Request, res: Response) {
        console.log('productPage');
        return app.render(req, res, '/product/[id]', { id: req.params.id })
    }
}

