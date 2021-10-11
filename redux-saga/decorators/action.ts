import Entity from "../models/Entity";
import { action } from '../store/actions';
const actionDecor = () => {
    return (target: any, propertyKey: string) => {
        const entityName = target.constructor.name;
        // target[propertyKey] = target[propertyKey].bind(target)
        console.log("target", target);
        
        const entityItem =
            entityName in Entity.getActions() ? Entity.getActions()[entityName] : {};
        if (!(propertyKey in entityItem)) {
            entityItem[propertyKey] = {
                saga: target[propertyKey],
                action: (data) => action(propertyKey, data),
                isAdded: false,
            };
        }
        Entity.getActions()[entityName] = entityItem;
    };
};

export default actionDecor;