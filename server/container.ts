import { Sequelize } from 'sequelize';
import awilix from "awilix";
import mysql2 from "mysql2";
import coreConfig from '../config';
import modelContainer, { IModelContainer } from './models';

export interface IContextContainer extends IModelContainer {
    config: any;
    db: Sequelize;
}

const container = awilix.createContainer<IContextContainer>({
    injectionMode: awilix.InjectionMode.PROXY,
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
    config: awilix.asValue(coreConfig),
    db: awilix.asFunction(createDB).singleton(),
});

export default container;
