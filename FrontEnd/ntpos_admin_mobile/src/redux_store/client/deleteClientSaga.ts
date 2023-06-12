import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteClientRequest, deleteClientSuccess, deleteClientFailure } from './deleteClientSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { gql } from '@apollo/client';
import { client } from '../../constants/graphql/apollo';
import { fetchUsersRequest } from './clientSlice';
import { setTime } from './filterSlice';
export const fetchDeleteClientQuery = gql`
  mutation DeleteClient($clientId: String) {
    deleteUser(id: $clientId) {
      id
    }
  }
`;
function* deleteClientSaga(action: any): Generator<any, any, any> {
  try {
    console.log(action.payload)
    const { data } = yield call(client.mutate, {
      mutation: fetchDeleteClientQuery,
      variables: {
        clientId: action.payload,
      },
    });
    console.log(data.deleteUser);
    yield put(setTime('ALL_TIME'));
    yield put(deleteClientSuccess());
  } catch (error: any) {
    yield put(deleteClientFailure(error.message));
  }
}

export function* watchDeleteClient() {
  yield takeEvery(deleteClientRequest.type, deleteClientSaga);
}