import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import { order, product } from "../../constants/graphql/apollo";
import {
    createOrder,
    createOrderFailure,
    createOrderSuccess,
    deleteOrder,
    deleteOrderFailure,
    deleteOrderSuccess, detailOrder,
    detailOrderFailure,
    detailOrderSuccess,
    editTableOrderFailure,
    editTableOrderRequest,
    editTableOrderSuccess,
    fetchOrdersFailure,
    fetchOrdersStart,
    fetchOrdersSuccess
} from "./ordersSilce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OrderLineItem, OrderTable } from "../../models/order";
export const fetchDeleteOrderQuery = gql`
  mutation($id: String){
  deleteOrder(id:$id){
  	id
  }
}
`;
export const fetchCreateOrderQuery = gql`
 mutation FetchCreateOrder ($userID : String, $group: String , $status: String, $note: String, $orderLineItems:[OrderProductInput], $tables: [OrderTableInput]){
  createOrder(orderInput:{
    userID: $userID,
    group:$group,
    status:$status,
    note:$note,
    orderLineItems:$orderLineItems,
    tables: $tables
  }){
    id
  }
}
`;

export const fetchEditUpdateOrder = gql`
 mutation fetchEditUpdateOrder($id:String,$userID : String, $group: String , $status: String, $note: String, $orderLineItems:[OrderProductInput], $tables: [OrderTableInput]){
  updateOrder(id: $id ,orderInput:{
    userID: $userID,
    group:$group,
    status:$status,
    note:$note,
    orderLineItems:$orderLineItems,
    tables: $tables,
  }){
    id
  }
}
`;
const fetchDetailOrderQuery = gql`
  query FetchDetailOrder($id:String) {
       order(id:$id){
        id
        userID
        group
        orderDate
        status
        note
        orderLineItems{
          productID
          name
          quantity
          price
          discount
        }
        tables{
          tableID
          name
          note
          status
          startTime
          endTime
        }
       }
      }
`;
const fetchOrdersQuery = gql`
  query FetchOrders {
    orders{
        id
        userID
        group
        orderDate
        status
        note
        orderLineItems{
            productID
            name
            quantity
            price
            discount
        }
        tables{
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
function* fetchOrdersData() {
    try {
        const { data } = yield call(order.query, {
            query: fetchOrdersQuery,
        });
        yield put(fetchOrdersSuccess(data.orders));
    } catch (error: any) {
        yield put(fetchOrdersFailure(error.message));
    }
}

export function* ordersSaga() {
    yield takeEvery(fetchOrdersStart.type, fetchOrdersData);
}
function* deleteOrderSaga(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const { data } = yield call(order.mutate, {
            mutation: fetchDeleteOrderQuery,
            variables: {
                id: action.payload,
            },
        });
        yield put(deleteOrderSuccess(data.deleteOrder.id == action.payload));
    } catch (error: any) {
        yield put(deleteOrderFailure(error.message));
    }
}

export function* watchDeleteOrder() {
    yield takeEvery(deleteOrder.type, deleteOrderSaga);
}
function* createOrderFunction(action: any): Generator<any, any, any> {
    try {
        const { userID, group, orderDate, status,note, orderLineItems, tables } = action.payload;
        const { data } = yield call(order.mutate, {
            mutation: fetchCreateOrderQuery,
            variables: {
                userID: userID,
                group: group,
                orderDate: 1,
                status: status,
                note: note,
                orderLineItems: orderLineItems,
                tables: tables,
            }
        });
        yield call(AsyncStorage.setItem, 'orderID', data.createOrder.id);
        if (data.createOrder.id !== null) {
            yield put(createOrderSuccess(true));
        }
    } catch (error: any) {
        yield put(createOrderFailure(error.message));
    }
}

export function* createOrderSaga() {
    yield takeEvery(createOrder.type, createOrderFunction);
}
function* createEditOrderTableFunction(action: any): Generator<any, any, any> {
    try {
        const { id,userID, group,  orderDate, status,note } = action.payload;
        const orderLineItems: [OrderLineItem] = action.payload.orderLineItems;
        const tables: [OrderTable] = action.payload.tables;
        console.log(tables)
        const {data} = yield call(order.mutate,{
            mutation : fetchEditUpdateOrder,
            variables: {
                id:id,
                userID:userID,
                group:group,
                status:status,
                note:note,
                orderLineItems:orderLineItems ,
                tables:tables,
            }
        });
        console.log(data.updateOrder.id);
        if (data.updateOrder.id === id) {
            yield put(editTableOrderSuccess(true));
        }
    } catch (error: any) {
        yield put(editTableOrderFailure(error.message));
    }
}

export function* createEditTableOrderSaga() {
    yield takeLatest(editTableOrderRequest.type, createEditOrderTableFunction);
}
function* fetchDetailOrderSaga(action: ReturnType<typeof detailOrder>) {
    try {
        const { data } = yield call(order.query, {
            query: fetchDetailOrderQuery,
            variables: {
                id: action.payload,
            },
        });
        yield put(detailOrderSuccess(data.order));
        console.log(data);
    } catch (error: any) {
        yield put(detailOrderFailure(error.message));
    }
}

export function* detailOrderSaga() {
    yield takeEvery(detailOrder.type, fetchDetailOrderSaga);
}
