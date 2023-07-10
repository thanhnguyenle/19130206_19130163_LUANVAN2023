import { takeLatest, put, call } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import { orderUri } from '../../constants/LinkAPI';
import { order } from '../../constants/graphql/apollo';
import { fetchOrdersFailure, fetchOrdersStart, fetchOrdersSuccess } from './ordersSilce';
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
    } catch (error: any) {
        yield put(fetchOrdersFailure(error.message));
    }
}

export function* ordersSaga() {
    yield takeLatest(fetchOrdersStart.type, fetchOrdersData);
}
