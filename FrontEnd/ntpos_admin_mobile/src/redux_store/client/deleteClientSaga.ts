import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteClientRequest, deleteClientSuccess, deleteClientFailure } from './deleteClientSlice';
import { gql } from '@apollo/client';
import { client } from '../../constants/graphql/apollo';
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
    yield put(deleteClientSuccess(data.deleteUser.id === action.payload));
  } catch (error: any) {
    yield put(deleteClientFailure(error.message));
  }
}

export function* watchDeleteClient() {
  yield takeEvery(deleteClientRequest.type, deleteClientSaga);
}