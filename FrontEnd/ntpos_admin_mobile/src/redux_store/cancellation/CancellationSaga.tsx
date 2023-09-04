import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { inventory } from "../../constants/graphql/apollo";
import {
  listMaterialsAll, listMaterialsAllFailure,
  listMaterialsFailure,
  listMaterialsSetup,
  requestMaterialsAll,
  requestMaterialsSetup
} from "./CancellationSlice";

export const fetchListMaterialSetupQuery = gql`
  query FetchListMaterialSetup{
     materialSetupDefault{
      id
      materialID
      unit
      quantity
      status
      description
  }
}
`;
function* fetchListMaterialSetupSaga() {
  try {
    const { data } = yield call(inventory.query, {
      query: fetchListMaterialSetupQuery,
    });
    console.log(data.materials.materialOutputs);
    yield put(listMaterialsSetup(data.materialSetupDefault));
  } catch (error: any) {
    yield put(listMaterialsFailure(error.message));
  }
}
export const fetchListMaterialAllQuery = gql`
  query FetchListMaterialAll{
   findAllMaterialNotRepeat{
      materialOutputs{
        id
        quantity
        name
        price
        expiredDate
        manufacturerDate
        unit
        description
        status
      }
  }
}
`;
function* fetchListMaterialAllSaga() {
  try {
    const { data } = yield call(inventory.query, {
      query: fetchListMaterialAllQuery,
    });
    yield put(listMaterialsAll(data.findAllMaterialNotRepeat.materialOutputs));
  } catch (error: any) {
    yield put(listMaterialsAllFailure(error.message));
  }
}
export const fetchSetDefaultQuery = gql`
 mutation FetchSetDefault ($materialSetupDefaultInputs:[MaterialSetupDefaultInput]){
  updateMaterialDefault(materialSetupDefaultInputs:$materialSetupDefaultInputs){
    success
  }
}
`;
export function* listCancellationSaga() {
  yield takeLatest(requestMaterialsSetup.type, fetchListMaterialSetupSaga);
  yield takeLatest(requestMaterialsAll.type, fetchListMaterialAllSaga);
}


