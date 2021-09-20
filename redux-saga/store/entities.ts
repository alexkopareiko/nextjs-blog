import { SET_ALL_DATA } from "./actions";

const initialEntities = {};

// Updates an entity cache in response to any action with response.entities.
function entities(state = initialEntities, action: any) {
    switch (action.type) {
        case SET_ALL_DATA:
            if (action.response && action.response.entities) {
                const { response: { entities } } = action;
                if (entities) {
                    Object.keys(entities).map((entityName) => {
                        let list = state.get(entityName);
                        if (list && list.size > 0) {
                            Object.keys(entities[entityName]).map((id) => list = list.remove(id));
                        }
                        state = state.set(entityName, list);
                    });
                    state = state.mergeDeep(fromJS(entities));
                }
            }
            break;
    }
    return state;
}

export default entities;
