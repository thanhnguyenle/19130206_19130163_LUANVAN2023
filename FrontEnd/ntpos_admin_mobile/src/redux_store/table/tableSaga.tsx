import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { setData, setError, fetchTablesStart, createTableSuccess, createTableFailure, createTable, deleteTableSuccess, deleteTableFailure, deleteTable } from './tableSlice';
import { gql } from "@apollo/client";
import { order } from '../../constants/graphql/apollo';
export const fetchTableQuery = gql`
  query FetchTables{
    findAllTables{
      tables{
        id
        name
        note
        numberOfPeople
        status
        groups{
          id
          name
          status
          note
        }
      }
    }
}
`;
const fetchCreateTableQuery = gql`
    mutation FetchCreateTable(
            $name:String,
            $numberOfPeople:Int,
            $note:String,
            $status:String
            $groups:[String],
        ) {
        createTable (
            tableInput:{
            name:$name
            numberOfPeople: $numberOfPeople
            note: $note
            status:$status
            groups:$groups
        }){
            id
        }
    }
`;
export const fetchDeleteTableQuery = gql`
  mutation($id: String){
    deleteTable(id:$id){
      id
    }
  }
`;
function* fetchTableDataSaga() {
  try {
    const { data } = yield call(order.query, {
      query: fetchTableQuery,
    });
    yield put(setData(data.findAllTables.tables));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* tableSaga() {
  yield takeLatest(fetchTablesStart.type, fetchTableDataSaga);
}

function* createTableFun(action: any): Generator<any, any, any> {
  try {
    const { name, numberOfPeople, note, status, groups, } = action.payload;
    const { data } = yield call(order.mutate, {
      mutation: fetchCreateTableQuery,
      variables: {
        name: name,
        numberOfPeople: numberOfPeople,
        note: note,
        status: status,
        groups: groups,
      }
    });
    if (data.createTable.id !== null) {
      yield put(createTableSuccess(true));
    }
  } catch (error: any) {
    yield put(createTableFailure(error.message));
  }
}

export function* watchCreateTable() {
  yield takeLatest(createTable.type, createTableFun);
}

function* deleteTableSaga(action: any): Generator<any, any, any> {
  try {
    console.log(action.payload)
    const { data } = yield call(order.mutate, {
      mutation: fetchDeleteTableQuery,
      variables: {
        id: action.payload,
      },
    });
    yield put(deleteTableSuccess(data.deleteTable.id === action.payload));
  } catch (error: any) {
    yield put(deleteTableFailure(error.message));
  }
}

export function* watchDeleteTable() {
  yield takeEvery(deleteTable.type, deleteTableSaga);
}
