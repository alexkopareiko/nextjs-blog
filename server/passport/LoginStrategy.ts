import { Request } from 'express';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

import BaseContext from '../BaseContext';
import { IContextContainer } from "../container";
import config from '../../config'

export default class LoginStrategy extends BaseContext {
    private strategyUser: passportLocal.Strategy;

    get strategy() {
        return this.strategyUser;
    }

    constructor(opts: IContextContainer) {
        super(opts);

        console.log('jwt: initialization local-login strategy');
        this.verifyRequestUser = this.verifyRequestUser.bind(this);

        this.strategyUser = new passportLocal.Strategy({
            passwordField: 'userPasswd',
            passReqToCallback: true,
            usernameField: 'userEmail',
            session: false,

        }, this.verifyRequestUser);
    }


    public async verifyRequestUser(req: Request, email: string, password: string, done: any) {
        console.log(req.body)
        const { UserSeviceCustom, UserModel } = this.di;
        const userEmail = email && email.trim().toLowerCase();
        const user = await UserSeviceCustom.getUserByEmail(userEmail);
        if (!user) {
            return done('Incorrect password');
        }
        if (!user.userPasswd) {
            return done('You are not registered on the site');
        }

        const bcryptRes = await bcrypt.compare(password, user.userPasswd);
        if (!bcryptRes) {
            return done('Incorrect password');
        }

        const payload = {
            id: user.userId
        };
        const token = jwt.sign(payload, config.jwtSecret);
        user.userToken = token;
        user.save();

        //const identity = user.initSession(req);
        return done(null, {
            userId: user.userId,
            userEmail: user.userEmail,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userImg: user.userImg,
        });
    }

}