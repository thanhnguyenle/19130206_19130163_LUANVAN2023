import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import { product } from '../../constants/graphql/apollo';
import { fetchCategorysFailure, fetchListCategory, requestListCategory } from './categorySlice';
const fetchCategorysQuery = gql`
  query FetchCategories {
    categories{
        id
        name
        description
        products {
            id
        }
   }
  }
`;

function* fetchCategoryData() {
    try {
        const { data } = yield call(product.query, {
            query: fetchCategorysQuery,
        });
        yield put(fetchListCategory(data.categories));
    } catch (error: any) {
        yield put(fetchCategorysFailure(error.message));
    }
}

export function* watchCategorySaga() {
    yield takeLatest(requestListCategory.type, fetchCategoryData);
}
