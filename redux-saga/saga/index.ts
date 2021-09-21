import { all, call } from "redux-saga/effects"
import products from './products'
import identity from './identity'
import reviews from "./reviews"
import users from "./users"


export default function* rootWatcher() {
    console.log('rootWatcher')
    yield all([
        // call(products),
        // call(identity),
        // call(reviews),
        // call(users),
    ])
}