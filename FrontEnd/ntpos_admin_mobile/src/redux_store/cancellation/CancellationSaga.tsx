import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { inventory, order } from "../../constants/graphql/apollo";
import {
  listMaterialsAll,
  listMaterialsAllFailure,
  listMaterialsFailure,
  listMaterialsSetup, requestImportToMaterial,
  requestMaterialsAll,
  requestMaterialsSetup,
  requestSetDefault,
  requestXuatKho,
  setDefaultMaterialFailure,
  setDefaultMaterials, setImportToMaterial, setImportToMaterialFailure,
  setXuatKho,
  setXuatKhoFailure
} from "./CancellationSlice";
import { deleteInventoryFailure, deleteInventorySuccess } from "../inventory/InventorySlice";
import { fetchDeleteInventoryQuery } from "../inventory/InventorySaga";
import { Alert } from "react-native";


export const fetchListMaterialSetupQuery = gql`
  query FetchListMaterialSetup{
     materialSetupDefaultNotRepeat{
      id
      materialId
      name
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
    yield put(listMaterialsSetup(data.materialSetupDefaultNotRepeat));
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

function* createSetDefaultFunction(action: any): Generator<any, any, any> {
  try {
    console.log( action.payload)
    const { data } = yield call(inventory.mutate, {
      mutation: fetchSetDefaultQuery,
      variables: {
        materialSetupDefaultInputs: action.payload,
      }
    });
    console.log(action.payload)
    if (data.updateMaterialDefault.success !== null) {
      yield put(setDefaultMaterials(true));
    }else {
      yield put(setDefaultMaterials(false));
    }
  } catch (error: any) {
    yield put(setDefaultMaterialFailure(error.message));
  }
}
export const exportFromMaterial = gql`
  mutation{
    exportFromMaterial{
      success
    }
  }
`;
function* exportFromMaterialSaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(inventory.mutate, {
      mutation: exportFromMaterial,
    });
    if(data.exportFromMaterial.success == true){
      Alert.alert('Succes', 'Xuất kho thành công!');
      yield put(setXuatKho(true));
    }else {
      Alert.alert('Error', 'Xuất kho lỗi!');
      yield put(setXuatKho(false));
    }
  } catch (error: any) {
    yield put(setXuatKhoFailure(error.message));
  }
}
export const fetchImportToMaterialQuery = gql`
 mutation FetchImportToMaterial($materialQuantityInput:[MaterialQuantityInput]){
  importToMaterial(materialQuantityInput:$materialQuantityInput){
    success
  }
}
`;
function* exportImportToMaterialSaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(inventory.mutate, {
      mutation: fetchImportToMaterialQuery,
      variables: {
        materialQuantityInput: action.payload,
      }
    });
    console.log(data.importToMaterial.success)
    if(data.importToMaterial.success == true){
      Alert.alert('Succes', 'Nhập kho thành công!');
      yield put(setImportToMaterial(true));
    }else {
      Alert.alert('Error', 'Nhập kho lỗi!');
      yield put(setImportToMaterial(false));
    }
  } catch (error: any) {
    yield put(setImportToMaterialFailure(error.message));
  }
}
export function* listCancellationSaga() {
  yield takeLatest(requestMaterialsSetup.type, fetchListMaterialSetupSaga);
  yield takeLatest(requestMaterialsAll.type, fetchListMaterialAllSaga);
  yield takeLatest(requestSetDefault.type, createSetDefaultFunction);
  yield takeLatest(requestXuatKho.type, exportFromMaterialSaga);
  yield takeLatest(requestImportToMaterial.type, exportImportToMaterialSaga);
}


