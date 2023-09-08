import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { inventory, payment } from "../../constants/graphql/apollo";
import {
  createInventory, createInventoryFailure, createInventorySuccess,
  deleteInventory, deleteInventoryFailure, deleteInventorySuccess,
  detailInventoryFailure, detailInventoryNull, detailInventoryRequest,
  detailInventorySuccess,
  listInventors,
  listInventorsFailure, listMaterialReturnFailure, listMaterialReturns, listSuppliersFailure, listSuppliersSuccess,
  requestInventors, requestMaterialReturns, requestSuppliers
} from "./InventorySlice";
export const fetchListInventoryQuery = gql`
  query FetchListInventory{
    materials{
     materialOutputs{
      id
      name
      unit
      price
      quantity
      status
      description
      expiredDate
      manufacturerDate
      }
    }
}
`;
function* fetchListInventorySaga() {
  try {
    const { data } = yield call(inventory.query, {
      query: fetchListInventoryQuery,
    });
    console.log(data.materials.materialOutputs);
    yield put(listInventors(data.materials.materialOutputs));
  } catch (error: any) {
    yield put(listInventorsFailure(error.message));
  }
}

export function* listInventorySaga() {
  yield takeLatest(requestInventors.type, fetchListInventorySaga);
}

const fetchDetailInventoryQuery = gql`
  query FetchInventory($id:String) {
    material(id:$id){
      id
      name
      unit
      price
      quantity
      status
      description
      expiredDate
      manufacturerDate
     }
  }
`;
function* fetchDetailInventorySaga(action: ReturnType<typeof detailInventoryRequest>) {
  try {
    yield put(detailInventoryNull())
    const { data } = yield call(inventory.query, {
      query: fetchDetailInventoryQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(detailInventorySuccess(data.material));
  } catch (error: any) {
    yield put(detailInventoryFailure(error.message));
  }
}

export function* detailDetailInventorySaga() {
  yield takeEvery(detailInventoryRequest.type, fetchDetailInventorySaga);
}

export const fetchDeleteInventoryQuery = gql`
  mutation($id: String){
  deleteMaterial(id:$id){
  	id
  }
}
`;
function* deleteInventorySaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(inventory.mutate, {
      mutation: fetchDeleteInventoryQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(deleteInventorySuccess(data.deleteMaterial.id === action.payload));
  } catch (error: any) {
    yield put(deleteInventoryFailure(error.message));
  }
}

export function* watchDeleteInventory() {
  yield takeEvery(deleteInventory.type, deleteInventorySaga);
}

export const fetchCreateInventoryQuery = gql`
 mutation FetchCreateInventory ($name : String, $price: Float , $unit:String,$quantity:Int,  $status: String, $description: String, 
  $expiredDate: Int,$manufacturerDate: Int){
  createMaterial(materialInput:{
    name:$name
    price:$price
    unit: $unit
    quantity: $quantity
    status: $status
    description: $description
    expiredDate: $expiredDate
    manufacturerDate: $manufacturerDate
    images: []
  }){
    id
  }
}
`;
function* createInventoryFunction(action: any): Generator<any, any, any> {
  try {
    const { name, price, unit,quantity, status,description, expiredDate, manufacturerDate } = action.payload;
    const { data } = yield call(inventory.mutate, {
      mutation: fetchCreateInventoryQuery,
      variables: {
        name:name,
        price:price,
        unit:unit,
        quantity:quantity,
        status:status,
        description:description,
        expiredDate: expiredDate,
        manufacturerDate:manufacturerDate,
      }
    });
    if (data.createMaterial.id !== null) {
      yield put(createInventorySuccess(true));
    }
  } catch (error: any) {
    yield put(createInventoryFailure(error.message));
  }
}
export function* createInventorySaga() {
  yield takeEvery(createInventory.type, createInventoryFunction);
}

////////////////////////////////

export const fetchListMaterialReturnQuery = gql`
  query FetchListMaterialReturn{
    materialReturns{
      materialReturnOutputs{
        id
        materialID
        price
        unit
        quantity
        status
        description
        returnDate
      }
  }
}
`;
function* fetchListMaterialReturnSaga() {
  try {
    console.log('hello');
    const { data } = yield call(inventory.query, {
      query: fetchListMaterialReturnQuery,
    });
    yield put(listMaterialReturns(data.materialReturns.materialReturnOutputs));
  } catch (error: any) {
    yield put(listMaterialReturnFailure(error.message));
  }
}

export function* listMaterialReturnSaga() {
  yield takeEvery(requestMaterialReturns.type, fetchListMaterialReturnSaga);
}
////////////////////////////////

export const fetchListSupplierQuery = gql`
  query FetchListSupplier{
    suppliers{
     supplierOutputs{
        id
        name
        address
        phone
        email
        website
        status
        description
      }
  }
}
`;
function* fetchListSupplierSaga() {
  try {
    const { data } = yield call(inventory.query, {
      query: fetchListSupplierQuery,
    });
    yield put(listSuppliersSuccess(data.suppliers.supplierOutputs));
  } catch (error: any) {
    yield put(listSuppliersFailure(error.message));
  }
}

export function* listSupplierSaga() {
  yield takeEvery(requestSuppliers.type, fetchListSupplierSaga);
}
