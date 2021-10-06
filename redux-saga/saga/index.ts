import { ENTITIES } from "../../constants";
import { all, call } from "redux-saga/effects"
import productEntity from "redux-saga/models/ProductEntity";
import reviewEntity from "redux-saga/models/ReviewEntity";
import userEntity from "redux-saga/models/UserEntity";
import categoryEntity from "redux-saga/models/CategoryEntity";

export const rootWatcher = function* root() {

  const sagaAll = [
    productEntity.getActions(ENTITIES.PRODUCTS),
    reviewEntity.getActions(ENTITIES.CATEGORIES),
    userEntity.getActions(ENTITIES.REVIEWS),
    categoryEntity.getActions(ENTITIES.USERS),
  ];
  //  console.log("sagaAll",sagaAll);
  
  yield all(sagaAll.map(
    entity => all(
      Object.values(entity).map(
        (saga: any) => call(saga.saga)
      )
    )
  ));
}