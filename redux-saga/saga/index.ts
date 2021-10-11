import 'redux-saga/models/IdentityEntity';
import "redux-saga/models/ProductEntity";
import "redux-saga/models/ReviewEntity";
import "redux-saga/models/UserEntity";
import "redux-saga/models/CategoryEntity";

import Entity from 'redux-saga/models/Entity';
import { all, call } from 'redux-saga/effects';

export const rootWatcher = function* root() {
  const actions = Entity.getActions();
  
  yield all(Object.values(actions).map(
    entity => all(
      Object.values(entity).map(
        (saga: any) => call(saga.saga)
      )
    )
  ));
}