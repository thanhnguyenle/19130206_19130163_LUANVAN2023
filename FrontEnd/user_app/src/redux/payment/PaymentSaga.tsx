import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import { gql } from "@apollo/client";
import {payment} from "../../constants/apollo";
import {
  createReceiptOrderFailure,
  createReceiptOrderRequest,
  createReceiptOrderSuccess, detailReceiptOrder, detailReceiptOrderFailure, detailReceiptOrderRequest,
  fetchDeleteReceiptOrdersFailure,
  fetchDeleteReceiptOrdersStart,
  fetchDeleteReceiptOrdersSuccess,
  fetchReceiptOrdersFailure,
  fetchReceiptOrdersStart,
  fetchReceiptOrdersSuccess
} from "./PaymentSlice";
export const fetchDeleteReceiptOrderQuery = gql`
  mutation ($id : String) {
      deleteReceiptOrder( id:$id){
         id 
      }
 }
`;
export const fetchCreateReceiptOrderQuery = gql`
 mutation FetchCreateReceiptOrder ($orderID : String, $total: Float , $totalReceive: Float,$totalReturn:Float,  $status: String, $description: String, $paymentType:String, $accountSend: String,$accountReceive: String){
  createReceiptOrder(receiptOrderInput:{
    orderID:$orderID
    total:$total
    totalReceive: $totalReceive
    totalReturn: $totalReturn
    status: $status
    description: $description
    paymentType: $paymentType
    accountSend: $accountSend
    accountReceive: $accountReceive
  }){
    id
  }
}
`;
const fetchReceiptOrdersQuery = gql`
  query ReceiptOrders {
    receiptOrders{
       receiptOrderOutputs{
          id
          orderID
          total
          totalReceive
          totalReturn
          status
          description
          paymentType
          createdAt
        }
      }
  }
`;
const fetchDetailReceiptOrderQuery = gql`
  query FetchDetailReceiptOrder($id:String) {
     receiptOrder(id:$id){
          id
          orderID
          total
          totalReceive
          totalReturn
          status
          description
          paymentType
          createdAt
      }
   }
`;
function* fetchReceiptOrders() {
  try {
    const { data } = yield call(payment.query, {
      query: fetchReceiptOrdersQuery,
    });
    console.log(data.receiptOrders);
    yield put(fetchReceiptOrdersSuccess(data.receiptOrders.receiptOrderOutputs));
  } catch (error: any) {
    yield put(fetchReceiptOrdersFailure(error.message));
  }
}

export function* receiptOrdersSaga() {
  yield takeEvery(fetchReceiptOrdersStart.type, fetchReceiptOrders);
}
function* createReceiptOrderFunction(action: any): Generator<any, any, any> {
  try {
    const { orderID, total, totalReceive,totalReturn, status,description, paymentType, accountSend,accountReceive } = action.payload;
    const { data } = yield call(payment.mutate, {
      mutation: fetchCreateReceiptOrderQuery,
      variables: {
       orderID:orderID,
        total:total,
        totalReceive:totalReceive,
        totalReturn:totalReturn,
        status:status,
        description:description,
        paymentType: paymentType,
        accountReceive:accountReceive,
        accountSend:accountSend,
      }
    });
    if (data.createReceiptOrder.id !== null) {
      yield put(createReceiptOrderSuccess(true));
    }
  } catch (error: any) {
    yield put(createReceiptOrderFailure(error.message));
  }
}
export function* createReceiptOrderSaga() {
  yield takeEvery(createReceiptOrderRequest.type, createReceiptOrderFunction);
}
function* deleteReceiptOrderSaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(payment.mutate, {
      mutation: fetchDeleteReceiptOrderQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(fetchDeleteReceiptOrdersSuccess(data.deleteReceiptOrder.id == action.payload));
  } catch (error: any) {
    yield put(fetchDeleteReceiptOrdersFailure(error.message));
  }
}

export function* watchDeleteReceiptOrder() {
  yield takeEvery(fetchDeleteReceiptOrdersStart.type, deleteReceiptOrderSaga);
}
function* fetchDetailReceiptOrderSaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(payment.query, {
      query: fetchDetailReceiptOrderQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(detailReceiptOrder(data.receiptOrder));
    console.log(data);
  } catch (error: any) {
    yield put(detailReceiptOrderFailure(error.message));
  }
}

export function* detailReceiptOrderSaga() {
  yield takeEvery(detailReceiptOrderRequest.type, fetchDetailReceiptOrderSaga);
}


