import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import { order } from  "../../constants/apollo";
import {
    createOrder,
    createOrderFailure,
    createOrderSuccess,
    ordersFailure,
    ordersRequest,
    ordersSuccess
} from './orderSlice';
import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchOrdersQuery = gql`
  query FetchOrders ($userId: String){
        findOrdersByUserID(userID:$userId){
          orders{
            id
            userID
            group
            orderDate
            status
            note
             orderLineItems{
              productID
              quantity
              name
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
          currentPage
          totalPage
          totalItem
       }
      }
`;
function* fetchOrdersData(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload);
        const { data } = yield call(order.query, {
            query: fetchOrdersQuery,
            variables: {
                userId: action.payload,
            },
        });
        console.log(data.findOrdersByUserID.orders);
        yield put(ordersSuccess(data.findOrdersByUserID.orders));
    } catch (error: any) {
        yield put(ordersFailure(error.message));
    }
}
export function* ordersSaga() {
    yield takeEvery(ordersRequest.type, fetchOrdersData);
}

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
function* createOrderFunction(action: any): Generator<any, any, any> {
    try {
        const { userID, group, orderDate, status,note, orderLineItems, tables } = action.payload;
        console.log(action.payload)
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
