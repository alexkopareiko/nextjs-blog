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

    public async verifyRequest(jwtPayload: any, done: any) {

        const { UserSeviceCustom, UserModel } = this.di;
        console.log(jwtPayload)
        const user = await UserSeviceCustom.getUserById(jwtPayload.userId);
        if (user) {
            //const identity = user.initSession(this._request);
            const identity = user;

            return done(null, identity);
            //return done(null, { ...jwtPayload, identity });
        }

        return done('User was not found', false);


    }

    public getJwtFromRequest(req: Request) {
        this._request = req;
        const getToken = jwt.ExtractJwt.fromAuthHeaderAsBearerToken();
        // console.log('getToken(req)', getToken(req));
        // console.log('req.cookies[token]', req.cookies['token']);
        return getToken(req) || req.cookies['token'] || null;
    }


}