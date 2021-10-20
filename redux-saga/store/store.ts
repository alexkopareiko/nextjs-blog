import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { fromJS, Map } from 'immutable';
import { rootWatcher } from '../saga/index'
import identity from './identity'
import { serialize, deserialize } from 'json-immutable';

import { SET_ALL_DATA_SCHEMA, SET_ALL_SSRDATA } from './actions';


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}
export interface AppState {
    entities: Map<string, Map<string, any>>,
}

const initialEntities = fromJS({});

function entities(state: any = initialEntities, action: any) {
    switch (action.type) {
        case SET_ALL_DATA_SCHEMA:
            if (action.response && action.response.entities) {
                const { response: { entities } } = action;
                if (entities) {
                    Object.keys(entities).map((entityName) => {
                        let list: any = state.get(entityName);
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

function ssrData(state: any = {}, action: any) {
    switch (action.type) {
        case SET_ALL_SSRDATA: {
            return {
                // ...state,
                ...action.data,
            }
        }
        default:
            return state
    }
}

const appReducer = combineReducers({
    identity,
    entities,
    ssrData
})

let isHydrated = false;

function nextReducer(state: AppState, action) {
    if (action.type.includes('@@redux/INIT')) {
        isHydrated = false;
    }
    switch (action.type) {
        case HYDRATE: {
            if (action.payload.entities.size <= 0) {
                return { ...state };
            }
            return { ...state, ...action.payload };
        }
        default:
            return state
    }
}

function rootReducer(state, action) {
    const intermediateState: any = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}




export const makeStore = (ctx) => {
    const sagaMiddleware = createSagaMiddleware()
    const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware]))
    store.sagaTask = sagaMiddleware.run(rootWatcher)
    return store
}


// export const wrapper = createWrapper(makeStore)
const wrapper = createWrapper(makeStore, {
    serializeState: state => {
        return state === Object(state) ? serialize(state) : state;
    },
    deserializeState: state => {
        return state === Object(state) ? state : deserialize(state);
    }
});

export default wrapper;