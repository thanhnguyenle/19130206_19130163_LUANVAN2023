// detailClientSaga.ts
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchClientRequest, fetchClientSuccess, fetchClientFailure } from './detailClientSlice';
import { gql } from '@apollo/client';
import { client } from '../../constants/graphql/apollo';

const getClientById = gql`
  query FetchUsersById($id:String) {
    user(id: $id){
      id
      username
      name
      email
      password
      phoneNumber
      address
      avatar
      registeredAt
      roles{
          roleName
      }
      groups{
         id
         name
      }

  }
}
`;
export default getClientById;
function* fetchClientSaga(action: ReturnType<typeof fetchClientRequest>) {
    try {
        const { data } = yield call(client.query, {
            query: getClientById,
            variables: {
                id: action.payload,
            },
        });
        yield put(fetchClientSuccess(data.user));
    } catch (error: any) {
        yield put(fetchClientFailure(error.message));
    }
}

export function* detailClientSaga() {
    yield takeEvery(fetchClientRequest.type, fetchClientSaga);
}
