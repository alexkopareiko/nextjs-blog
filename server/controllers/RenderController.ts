import { route, GET } from 'awilix-express'; // or `awilix-router-core`
import { Request, Response } from "express";
import BaseContext from '../BaseContext';

import { ENTITIES } from '../../constants';
import httpStatus from '../../http-status';
import { USERROLES } from './../../constants';
@route('')
export default class RenderController extends BaseContext {

    @route('/product/addnew')
    @GET()
    productAddNewPage(req: Request, res: Response) {
        const { passportCustom, UserSeviceCustom } = this.di;
        passportCustom.authenticate('local-jwt', async (errors: any, identity) => {
            if (errors) {
                return res.answer(null, 'Could not authorized', httpStatus.UNAUTHORIZED);
            } else if (identity) {
                const user = await UserSeviceCustom.getUserById(identity.userId)
                if (user && [user.userRole === USERROLES.SELLER || user.userRole === USERROLES.ADMIN]) {
                    res.print('/product/addnew');
                }
            }
            return res.print('/404');
        })(req, res);
    }

    @route('/product/:id')
    @GET()
    productPage(req: Request, res: Response) {
        const { ProductService } = this.di;
        const id = Number(req.params.id);
        const ssrData = {};
        return ProductService.findOne(id)
            .then(data => {
                ssrData[ENTITIES.PRODUCT] = data;
                res.print('/product/[id]', ssrData);
            })
            .catch(e => res.print('/404'));
    }

    @route('/')
    @GET()
    indexPage(req: Request, res: Response) {
        const { ProductService } = this.di;
        const ssrData = {};
        ProductService.getAllProducts()
            .then(data => {
                ssrData[ENTITIES.PRODUCTS] = data;
                res.print('/index', ssrData);
            }).catch(e => res.print('/404'));
    }
}