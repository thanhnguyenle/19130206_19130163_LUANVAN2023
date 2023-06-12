import { takeLatest, put, call } from 'redux-saga/effects';
import { setSearch, setTime } from './filterSlice';
import { fetchUsersSuccess } from './clientSlice';
import { gql } from '@apollo/client';
import { client } from '../../constants/graphql/apollo';

export const fetchUsersFifterTimeQuery = gql`
    query FetchFilteredTimeUsers($time:TimeSearch) {
    usersFilterByTime(timeSearch:$time) {
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
export const fetchUsersFifterSearch = gql`
    query FetchUsersFifterSearch($searchType:String,$searchValue:String) {
        usersFilter(searchType:$searchType, searchValue:$searchValue) {
            users{
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
            }
            }
        }
  }
`;
export function* filterUsers(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const { data } = yield call(client.query, {
            query: fetchUsersFifterTimeQuery,
            variables: {
                time: action.payload,
            },
        });
        yield put(fetchUsersSuccess(data.usersFilterByTime));
    } catch (error: any) {
    }
}
export function* filterSearchUsers(action: any): Generator<any, any, any> {
    try {
        const { searchType, searchValue } = action.payload;
        console.log(action.payload);
        const { data } = yield call(client.query, {
            query: fetchUsersFifterSearch,
            variables: {
                searchType: searchType,
                searchValue: searchValue,
            },
        });
        yield put(fetchUsersSuccess(data.usersFilter.users));
    } catch (error: any) {
    }
}

export function* filterSaga() {
    yield takeLatest(setTime.type, filterUsers);
}
export function* filterSearchSaga() {
    yield takeLatest(setSearch.type, filterSearchUsers);
}
