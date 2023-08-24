import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { client } from '../../constants/graphql/apollo';
import { addClientFailure, addClientRequest, addClientSuccess, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess } from './clientSlice';
import { gql } from '@apollo/client';
import { User } from '../../models/user';
import { PayloadAction } from '@reduxjs/toolkit';
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
const getClientById1 = gql`
  query FetchUsersById($id:String) {
    user(id: $id){
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
      }
  }
}
`;
const addClientQuery = gql`
  mutation AddClient($username :String, $name: String, $email: String, $password :String,$phoneNumber : String, $address:String, $avatar:String,$groups: [String]) {
    createUser(userInput:{
     username:$username
     name: $name
     email: $email
     password: $password 
     phoneNumber: $phoneNumber
     address: $address
     avatar: $avatar
     groups: $groups
  }) {
      id
    }
  }
`;
function* addClientWorker(action: PayloadAction<User>): Generator<any, any, any> {
  try {
    const { username, name, email, password, phoneNumber, address, avatar, groups } = action.payload;
    const { data } = yield call(client.mutate, {
      mutation: addClientQuery,
      variables: {
        username: username,
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
        avatar: avatar,
        groups: groups,
      },
    });
    if(data.createUser.id){
      yield put(addClientSuccess(true));
    }
  } catch (error: any) {
    yield put(addClientFailure(error.message));
  }
}

export function* addClientSaga() {
  yield takeEvery(addClientRequest.type, addClientWorker);
}
