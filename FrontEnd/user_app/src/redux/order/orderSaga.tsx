import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import { order } from  "../../constants/apollo";
import { ordersFailure, ordersRequest, ordersSuccess } from './orderSlice';

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
              price
              discount
            }
            tables{
              tableID
              note
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