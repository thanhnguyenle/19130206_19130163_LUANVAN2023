import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import { deleteOrder, deleteOrderFailure, deleteOrderSuccess, fetchOrdersFailure, fetchOrdersStart, fetchOrdersSuccess } from './orderSlice';
import {order} from "../../assets/constants/graphql/apollo";
export const fetchDeleteOrderQuery = gql`
  mutation($id: String){
  deleteOrder(id:$id){
  	id
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
  }
`;
function* fetchOrdersData() {
    try {
        const { data } = yield call(order.query, {
            query: fetchOrdersQuery,
        });
        yield put(fetchOrdersSuccess(data.orders));
    } catch (error) {
        yield put(fetchOrdersFailure('Loi'));
    }
}

export function* ordersSaga() {
    yield takeLatest(fetchOrdersStart.type, fetchOrdersData);
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
    } catch (error) {
        yield put(deleteOrderFailure("Loi"));
    }
}

export function* watchDeleteOrder() {
    yield takeEvery(deleteOrder.type, deleteOrderSaga);
}
