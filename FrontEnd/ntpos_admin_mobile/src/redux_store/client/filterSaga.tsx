import { takeLatest, put, call } from 'redux-saga/effects';
import { setTime } from './filterSlice';
import { fetchUsersSuccess } from './clientSlice';
import { gql } from '@apollo/client';
import { client } from '../../constants/graphql/apollo';

const fetchUsersFifterTimeQuery = gql`
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
export default fetchUsersFifterTimeQuery;
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

export function* filterSaga() {
    yield takeLatest(setTime.type, filterUsers);
}
