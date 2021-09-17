import { actionTypes } from 'redux-saga/store/actions';
import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import { rootWatcher } from '../saga/index'

import userReducer from './userReducer'
import productReducer from './productReducer'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const appReducer = combineReducers({
    userReducer,
    productReducer,
})

let isHydrated = false;
function nextReducer(state, action) {
    switch (action.type) {
        case HYDRATE: {
            if (!isHydrated) {
                isHydrated = true;
                return { ...state, ...action.payload }
            }
        }
        default:
            return state
    }
    return state
}

function rootReducer(state, action) {
    const intermediateState = appReducer(state, action);
    const finalState = nextReducer(intermediateState, action);
    return finalState;
}

export const makeStore = (context) => {
    const sagaMiddleware = createSagaMiddleware()

    const store: any = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

    store.sagaTask = sagaMiddleware.run(rootWatcher)

    return store
}

export const wrapper = createWrapper(makeStore)
