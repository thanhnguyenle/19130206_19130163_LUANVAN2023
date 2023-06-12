import { call, put, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { GroupUser, addGroup, fetchGroupsFailure, fetchListGroup, requestList } from './groupSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../../constants/graphql/apollo';
import { gql } from '@apollo/client';
export const addGroupMutation = gql`
  mutation AddGroup($name: String, $description: String, $roles: [String]) {
    createGroup(groupInput:{name: $name, description: $description, roles: $roles}) {
      id
    }
  }
`;
export const listGroups = gql`
  query FetchGroups {
    groups{
       id
       name
       description
       roles{
           roleName
       }
   }
  }
`;
const getGroupById = gql`
  query GetGroupById($id:String) {
    group(id: $id){
      id
      name
      description
      roles{
           roleName
       }
  }
}
`;
function* addGroupUser(action: PayloadAction<GroupUser>): Generator<any, any, any> {
  try {
    const { name, description, roles } = action.payload;
    console.log(description)
    const { data } = yield call(client.mutate, {
      mutation: addGroupMutation,
      variables: {
        name: name,
        description: description,
        roles: roles,
      },
    });
    const { group } = yield call(client.query, {
      query: getGroupById,
      variables: {
        id: data.createGroup.id,
      },
    });
    yield put(addGroup(group));
    Alert.alert('Thông báo', 'Đã tạo nhóm thành công!');
  } catch (error) {
    Alert.alert('Thông báo', 'Nhóm người dùng đã tồn tại!');
  }
}
function* fetchGroups() {
  try {
    const { data } = yield call(client.query, {
      query: listGroups,
    });
    yield put(fetchListGroup(data.groups));
  } catch (error: any) {
    yield put(fetchGroupsFailure(error.message));
  }
}

function* addgroupSaga() {
  yield takeEvery(addGroup.type, addGroupUser);
}
function* listGroupsSaga() {
  yield takeEvery(requestList.type, fetchGroups);
}

export { addgroupSaga, listGroupsSaga };
