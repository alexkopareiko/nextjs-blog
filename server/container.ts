import { Sequelize } from 'sequelize';
import { asFunction, asValue, createContainer, InjectionMode } from 'awilix';
import mysql2 from "mysql2";
import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';
import serviceContainer, { IServiceContainer } from './services';

export interface IContextContainer extends IModelContainer, IServiceContainer {
    config: any;
    db: Sequelize;
}

const container = createContainer<IContextContainer>({
    injectionMode: InjectionMode.PROXY,
});

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
    config: asValue(coreConfig),
    db: asFunction(createDB).singleton(),
});

export default container;
