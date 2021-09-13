import { Sequelize } from 'sequelize';
import * as awilix from 'awilix';
import mysql2 from "mysql2";
import passport, { PassportStatic } from 'passport';

import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';
import serviceContainer, { IServiceContainer } from './services';
import LoginStrategy from './passport/LoginStrategy';
import SignUpStrategy from './passport/SignUpStrategy';
import JwtStrategy from './passport/JwtStrategy';

export interface IContextContainer extends IModelContainer, IServiceContainer {
    config: any;
    db: Sequelize;
    LoginStrategy: LoginStrategy;
    SignUpStrategy: SignUpStrategy;
    JwtStrategy: JwtStrategy,
    passportCustom: PassportStatic;
}

const container = awilix.createContainer<IContextContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
});

const passportFunc = (ctx: IContextContainer) => {
    passport.use('local-login', ctx.LoginStrategy.strategy);
    passport.use('local-signup', ctx.SignUpStrategy.strategy);
    passport.use('local-jwt', ctx.JwtStrategy.strategy);
    return passport;
};

const createDB = (ctx: IContextContainer) => {
    return new Sequelize(
        ctx.config.db.database,
        ctx.config.db.username,
        ctx.config.db.password,
        {
            dialect: ctx.config.db.dialect,
            dialectModule: mysql2,
        }
    );
}

container.register({
    ...modelContainer,
    ...serviceContainer,
    config: awilix.asValue(coreConfig),
    db: awilix.asFunction(createDB).singleton(),
    LoginStrategy: awilix.asClass(LoginStrategy).singleton(),
    SignUpStrategy: awilix.asClass(SignUpStrategy).singleton(),
    JwtStrategy: awilix.asClass(JwtStrategy).singleton(),
    passportCustom: awilix.asFunction(passportFunc).singleton(),
});

export default container;
