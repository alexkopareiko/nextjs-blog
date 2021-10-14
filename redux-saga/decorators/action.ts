import Entity from "../models/Entity";
import { action as a} from '../store/actions';

const action = () => {
    return (target: any, propertyKey: string) => {
        const entityName = target.constructor.name;
        const entityItem = entityName in Entity.getActions() ? Entity.getActions()[entityName] : {};
        if (!(propertyKey in entityItem)) {
            entityItem[propertyKey] = {
                decoratorFunction: (data) => a(propertyKey, data),
            };
        }
        Entity.getActions()[entityName] = entityItem;
    };
};

export default action;