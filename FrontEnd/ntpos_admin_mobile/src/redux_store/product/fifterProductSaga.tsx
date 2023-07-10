import { takeLatest, put, call } from 'redux-saga/effects';
import { gql } from '@apollo/client';
import { client, product } from '../../constants/graphql/apollo';
import { fetchProductsSuccess } from './productSlice';
import { setTime } from './fifterProductSlice';

export const fetchProductsFifterTimeQuery = gql`
    query FetchFifterTimeProduct($time:TimeSearch) {
    productsFilterByTime( timeSearch:$time){
        products{
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
export function* filterProducts(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const { data } = yield call(product.query, {
            query: fetchProductsFifterTimeQuery,
            variables: {
                time: action.payload,
            },
        });
        yield put(fetchProductsSuccess(data.productsFilterByTime.products));
    } catch (error: any) {
    }
}

export function* filterProductsSaga() {
    yield takeLatest(setTime.type, filterProducts);
}

