import { all, call } from "redux-saga/effects"
import products from './products'
import identity from './identity'

export default function* rootWatcher() {
    console.log('rootWatcher')
    yield all([
        call(products),
        call(identity),
    ])
}