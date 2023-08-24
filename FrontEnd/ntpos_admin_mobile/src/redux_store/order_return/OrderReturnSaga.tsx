import { takeLatest, call, put, takeEvery } from "redux-saga/effects";
import { gql } from "@apollo/client";
import { order, payment } from "../../constants/graphql/apollo";
import {
  createOrderReturn,
  createOrderReturnFailure,
  createOrderReturnSuccess,
  deletePaySlipOrder,
  deletePaySlipOrderFailure,
  deletePaySlipOrderSuccess,
  detailPaySlipOrderSuccess,
  detailPaySlipOrder,
  detailPaySlipOrderFailure,
  fetchPaySlipOrdersStart,
  setPaySlipOrderError,
  setPaySlipOrders,
  fetchOrderReturnsStart,
  setOrderReturns,
  setOrderReturnsError,
  deleteOrderReturns,
  deleteOrderReturnsSuccess,
  deleteOrderReturnsFailure,
  createPaySlipOrder,
  createPaySlipOrderSuccess,
  createPaySlipOrderFailure,
  detailOrderReturn,
  detailOrderReturnFailure,
  detailOrderReturnNull, detailOrderReturnSuccess
} from "./OrderReturnSlice";
export const fetchCreatePaySlipOrderQuery = gql`
 mutation FetchCreatePaySlipOrder ($orderReturnID : String, $total: Float , $totalReceive: Float,$totalReturn:Float,  $status: String, $description: String, $paymentType:String, $accountSend: String,$accountReceive: String){
  createPaySlipOrder(paySlipOrderInput:{
    orderReturnID:$orderReturnID
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
export const fetchPaySlipOrderQuery = gql`
  query FetchPaySlipOrder{
    paySlipOrders{
     paySlipOrderOutputs{
        id
        orderReturnID
        total
        totalReceive
        totalReturn
        status
        description
        paymentType
        accountSend
        accountReceive
        createdAt
      }
    }
}
`;
export const DeletePaySlipOrderQuery = gql`
  mutation($id: String){
    deletePaySlipOrder(id:$id){
      id
    }
  }
`;
const fetchDetailPaySlipOrderQuery = gql`
  query FetchPaySlipOrder($id:String) {
  paySlipOrder(id:$id){
      id
      orderReturnID
      total
      totalReceive
      totalReturn
      status
      description
      paymentType
      accountSend
      accountReceive
      createdAt
   }
  }
`;
function* fetchOrderReturnSaga() {
  try {
    const { data } = yield call(payment.query, {
      query: fetchPaySlipOrderQuery,
    });
    yield put(setPaySlipOrders(data.paySlipOrders.paySlipOrderOutputs));
  } catch (error: any) {
    yield put(setPaySlipOrderError(error.message));
  }
}

export function* orderReturnSaga() {
  yield takeLatest(fetchPaySlipOrdersStart.type, fetchOrderReturnSaga);
}

function* deletePaySlipOrderSaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(payment.mutate, {
      mutation: DeletePaySlipOrderQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(deletePaySlipOrderSuccess(data.deletePaySlipOrder.id === action.payload));
  } catch (error: any) {
    yield put(deletePaySlipOrderFailure(error.message));
  }
}

export function* watchDeletePaySlipOrder() {
  yield takeEvery(deletePaySlipOrder.type, deletePaySlipOrderSaga);
}
function* fetchDetailPaySlipOrderSaga(action: ReturnType<typeof detailPaySlipOrderFailure>) {
  try {
    const { data } = yield call(payment.query, {
      query: fetchDetailPaySlipOrderQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(detailPaySlipOrderSuccess(data.paySlipOrder));
  } catch (error: any) {
    yield put(detailPaySlipOrderFailure(error.message));
  }
}

export function* detailPaySlipOrderSaga() {
  yield takeEvery(detailPaySlipOrder.type, fetchDetailPaySlipOrderSaga);
}
function* createPaySlipOrderFunction(action: any): Generator<any, any, any> {
  try {
    const { orderReturnID, total, totalReceive,totalReturn, status,description, paymentType, accountSend,accountReceive } = action.payload;
    const { data } = yield call(payment.mutate, {
      mutation: fetchCreatePaySlipOrderQuery,
      variables: {
        orderReturnID:orderReturnID,
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
    if (data.createPaySlipOrder.id !== null) {
      yield put(createPaySlipOrderSuccess(true));
    }
  } catch (error: any) {
    yield put(createPaySlipOrderFailure(error.message));
  }
}
export function* createPaySlipOrderSaga() {
  yield takeEvery(createPaySlipOrder.type, createPaySlipOrderFunction);
}

///////////////// Order Return
export const fetchCreateOrderReturnQuery = gql`
 mutation FetchCreateOrderReturn ($userID : String, $group: String ,$orderID: String, $status: String, $note: String, $orderLineItemsReturn:[OrderProductInput], $tablesReturn: [OrderTableInput]){
  createOrderReturn(orderReturnInput:{
    userID: $userID,
    group:$group,
    orderID: $orderID,
    status:$status,
    note:$note,
    orderLineItemsReturn:$orderLineItemsReturn,
    tablesReturn: $tablesReturn
  }){
    id
  }
}
`;
function* createOrderReturnFun(action: any): Generator<any, any, any> {
  try {
    const { userID, group,orderID, status,note, orderLineItemsReturn, tablesReturn } = action.payload;
    console.log('Hello')
    console.log(action.payload);
    const { data } = yield call(order.mutate, {
      mutation: fetchCreateOrderReturnQuery,
      variables: {
        userID: userID,
        group: group,
        orderID: orderID,
        status: status,
        note: note,
        orderLineItemsReturn: orderLineItemsReturn,
        tablesReturn: tablesReturn,
      }
    });
    if (data.createOrderReturn.id !== null) {
      yield put(createOrderReturnSuccess(true));
    }
  } catch (error: any) {
    yield put(createOrderReturnFailure(error.message));
  }
}
export function* createOrderReturnSaga() {
  yield takeEvery(createOrderReturn.type, createOrderReturnFun);
}

export const fetchOrderReturnsQuery = gql`
  query FetchOrderReturns{
        ordersReturn{
          id
          userID
          group
          orderID
          orderReturnDate
          orderLineItemsReturn{
            orderID
            productID
            quantity
            price
            name
            discount
          }
          tablesReturn{
            orderID
            tableID
            note
            name
            status
            startTime
            endTime
          }
          status
          note
      }
    }
`;
function* fetchOrderReturnsData() {
  try {
    const { data } = yield call(order.query, {
      query: fetchOrderReturnsQuery,
    });
    yield put(setOrderReturns(data.ordersReturn));
  } catch (error: any) {
    yield put(setOrderReturnsError(error.message));
  }
}

export function* OrderReturnsSaga() {
  yield takeEvery(fetchOrderReturnsStart.type, fetchOrderReturnsData);
}
//
export const DeleteOrderReturnQuery = gql`
  mutation($id: String){
    deleteOrderReturn(id:$id){
      id
    }
  }
`;
function* deleteOrderReturnSaga(action: any): Generator<any, any, any> {
  try {
    const { data } = yield call(order.mutate, {
      mutation: DeleteOrderReturnQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(deleteOrderReturnsSuccess(data.deleteOrderReturn.id === action.payload));
  } catch (error: any) {
    yield put(deleteOrderReturnsFailure(error.message));
  }
}
export function* watchDeleteOrderReturn() {
  yield takeEvery(deleteOrderReturns.type, deleteOrderReturnSaga);
}
//
const fetchDetailOrderReturnQuery = gql`
  query FetchOrderReturn($id:String) {
    orderReturn(id:$id){
      id
      userID
      group
      orderID
      orderReturnDate
      status
      note
      orderLineItemsReturn{
        orderID
        productID
        name
        quantity
        price
        discount
      }
      tablesReturn{
        orderID
        tableID
        note
        name
        status
        startTime
        endTime
      }
     }
  }
`;
function* fetchDetailOrderReturnSaga(action: ReturnType<typeof detailOrderReturn>) {
  try {
    const { data } = yield call(order.query, {
      query: fetchDetailOrderReturnQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(detailOrderReturnSuccess(data.orderReturn));
  } catch (error: any) {
    yield put(detailOrderReturnFailure(error.message));
  }
}

export function* detailOrderReturnSaga() {
  yield takeEvery(detailOrderReturn.type, fetchDetailOrderReturnSaga);
}






