import { call, put, takeLatest ,takeEvery} from 'redux-saga/effects';
import { client } from '../../assets/constants/graphql/apollo';
import {
  addClientFailure,
  addClientRequest,
  addClientSuccess,
  deleteClientFailure,
  deleteClientRequest,
  deleteClientSuccess,
  detailClientFailure,
  detailClientRequest,
  detailClientSuccess, editClientFailure,
  editClientRequest,
  editClientSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from './clientSlice';
import { gql } from '@apollo/client';
import {PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/user";
export const getClientById = gql`
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
export const addClientQuery = gql`
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
export const editClientQuery = gql`
 mutation EditClient($id :String,$username :String, $name: String, $email: String,$phoneNumber : String, $address:String,) {
    updateUser(
    id:$id,
    userInput:{
     username:$username
     name: $name
     email: $email
     phoneNumber: $phoneNumber
     address: $address
  }) {
      id
    }
  }
`;
export const fetchDeleteClientQuery = gql`
  mutation DeleteClient($clientId: String) {
    deleteUser(id: $clientId) {
      id
    }
  }
`;
export const fetchUsersQuery = gql`
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
    console.log(data.createUser.id);
    yield put(addClientSuccess(data.createUser));
  } catch (error) {
    yield put(addClientFailure('Loi'));
  }
}
function* fetchUsersSaga() {
  try {
    const { data } = yield call(client.query, {
      query: fetchUsersQuery, // Truy vấn GraphQL của bạn
    });
    yield put(fetchUsersSuccess(data.users));
    console.log(data.users)
  } catch (error) {
    yield put(fetchUsersFailure('Error'));
  }
}
export function* usersSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}
function* deleteClientSaga(action: any): Generator<any, any, any> {
  try {
    console.log(action.payload)
    const { data } = yield call(client.mutate, {
      mutation: fetchDeleteClientQuery,
      variables: {
        clientId: action.payload,
      },
    });
    if (data.deleteUser.id == action.payload) {
      yield put(deleteClientSuccess(true));
    }
  } catch (error) {
    yield put(deleteClientFailure("Error"));
  }
}
export function* watchDeleteClient() {
  yield takeEvery(deleteClientRequest.type, deleteClientSaga);
}
export function* addClientSaga() {
  yield takeEvery(addClientRequest.type, addClientWorker);
}

function* fetchDetailClientSaga(action: any): Generator<any, any, any>{
  try {
    const { data } = yield call(client.query, {
      query: getClientById,
      variables: {
        id: action.payload,
      },
    });
    yield put(detailClientSuccess(data.user));
  } catch (error) {
    yield put(detailClientFailure('Loi'));
  }
}
function* fetchEditClient(action: any): Generator<any, any, any> {
  try {
    const {id, username, name, email, phoneNumber, address } = action.payload;
    const { data } = yield call(client.mutate, {
      mutation: editClientQuery,
      variables: {
        id: id,
        username:username,
        name:name,
        email:email,
        phoneNumber:phoneNumber,
        address:address,
      },
    });
    yield put(editClientSuccess(data.updateUser.id === id));
  } catch (error) {
    yield put(editClientFailure("Error"));
  }
}
export function* detailClientSaga() {
  yield takeEvery(detailClientRequest.type, fetchDetailClientSaga);
}
export function* editClientSaga() {
  yield takeEvery(editClientRequest.type, fetchEditClient);
}
