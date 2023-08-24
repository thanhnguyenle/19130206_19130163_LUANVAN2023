import { takeLatest, put, call } from 'redux-saga/effects';
import { gql } from '@apollo/client';
import { order } from "../../constants/graphql/apollo";
import { fetchOrdersSuccess } from "./ordersSilce";
import { setTime } from "./fifterOrderSlice";
export const fetchOrdersFifterTimeQuery = gql`
    query FetchFifterTimeOrder($time:TimeSearch) {
    OrdersFilterByTime( timeSearch:$time){
        Orders{
        id
        name
        description
        images{
        url
        }
        categories {
        id
        name
        }
        quantity
        price
        status
    }
        currentPage
        totalPage
        totalItem
    }
  }
`;
export function* filterOrders(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const { data } = yield call(order.query, {
            query: fetchOrdersFifterTimeQuery,
            variables: {
                time: action.payload,
            },
        });
        yield put(fetchOrdersSuccess(data.OrdersFilterByTime.Orders));
    } catch (error: any) {
    }
}

export function* filterOrdersSaga() {
    yield takeLatest(setTime.type, filterOrders);
}

