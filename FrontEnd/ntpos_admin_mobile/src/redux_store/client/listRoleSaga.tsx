// listRolesSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchListRolesRequest, fetchListRolesSuccess, fetchListRolesFailure } from './listRoleSlice';

import { gql } from '@apollo/client';
import { client } from '../../constants/graphql/apollo';

export const fetchListRolesQuery = gql`
  query FetchListRoles {
    roles {
      roleName
    }
  }
`;
function* fetchListRolesSaga() {
    try {
        const { data } = yield call(client.query, {
            query: fetchListRolesQuery, // Truy vấn GraphQL của bạn
        });
        console.log(data.roles)
        yield put(fetchListRolesSuccess(data.roles));
    } catch (error: any) {
        yield put(fetchListRolesFailure(error.message));
    }
}

export function* listRolesSaga() {
    yield takeEvery(fetchListRolesRequest.type, fetchListRolesSaga);
}