import { ENTITIES } from "../../constants";
import { all, call } from "redux-saga/effects"
import productEntity from "redux-saga/models/ProductEntity";
import reviewEntity from "redux-saga/models/ReviewEntity";
import userEntity from "redux-saga/models/UserEntity";
import categoryEntity from "redux-saga/models/CategoryEntity";

export const rootWatcher = function* root() {

  const sagaAll = [
    productEntity.getActions("CategoryEntity"),
    reviewEntity.getActions("IdentityEntity"),
    userEntity.getActions("ProductEntity"),
    categoryEntity.getActions("ReviewEntity"),
    categoryEntity.getActions("UserEntity"),
  ];

  yield all(sagaAll.map(
    entity => all(
      Object.values(entity).map(
        (saga: any) => call(saga.saga)
      )
    )
  ));
}