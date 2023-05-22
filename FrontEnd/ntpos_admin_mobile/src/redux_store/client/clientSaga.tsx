import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { client } from '../../constants/graphql/apollo';
import { fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from './clientSlice';
import { gql } from '@apollo/client';

const fetchUsersQuery = gql`
  query FetchUsers {
    users {
       id
       username
       name
       email
       password
       phoneNumber
       address
       avatar
       registeredAt
       groups{
         id
         name
      }
    }
  }
`;
export default fetchUsersQuery;
function* fetchUsersSaga() {
  try {
    const { data } = yield call(client.query, {
      query: fetchUsersQuery, // Truy vấn GraphQL của bạn
    });
    yield put(fetchUsersSuccess(data.users));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}
export function* usersSaga() {
  yield takeEvery(fetchUsersRequest.type, fetchUsersSaga);
}