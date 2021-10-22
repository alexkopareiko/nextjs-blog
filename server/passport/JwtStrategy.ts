import { Request } from 'express';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import * as jwt from 'passport-jwt'
import config from '../../config'

import BaseContext from '../BaseContext';
import { IContextContainer } from "../container";

export default class JwtStrategy extends BaseContext {

    private _strategy: jwt.Strategy;
    private _request: jwt.Request

    get strategy() {
        return this._strategy;
    }

    constructor(opts: IContextContainer) {
        super(opts);
        console.log('jwt: initialization JWT strategy');

        this.verifyRequest = this.verifyRequest.bind(this);
        this.getJwtFromRequest = this.getJwtFromRequest.bind(this);

        this._strategy = new jwt.Strategy({
            jwtFromRequest: this.getJwtFromRequest,
            secretOrKey: config.jwtSecret,
        }, this.verifyRequest);
    }

    public verifyRequest(jwtPayload: any, done: any) {
        const { UserSeviceCustom, UserModel } = this.di;
        UserSeviceCustom.getUserById(jwtPayload.userId)
            .then(u => done(null, u))
            .catch(e => done('User was not found', false));
    }

    public getJwtFromRequest(req: Request) {
        this._request = req;
        const getToken = jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
        // console.log('req.cookies[token]-----------------------', req.cookies['token'] || getToken(req) || null);
        return req.cookies['token'] || getToken(req) || null;
    }


}