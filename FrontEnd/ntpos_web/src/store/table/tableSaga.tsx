import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import {
  setData,
  setError,
  fetchTablesStart,
  createTableSuccess,
  createTableFailure,
  createTable,
  deleteTableSuccess,
  deleteTableFailure,
  deleteTable,
  numberLengthTabled, numberLengthTabledSuccess, numberLengthTabledFailure, setDataTablesNone, fetchTablesNone1
} from "./tableSlice";
import { gql } from "@apollo/client";
import {order} from "../../assets/constants/graphql/apollo";
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
export const fetchTableLengthQuery = gql`
  query FetchTableLengths{
   findAllBusyTables{
     tables{
        id
        name
        status
        note
        groups{
          id
          name
          status
          note
        }
    }
    currentPage
    totalPage
    totalItem
  }
}
`;
export const fetchAllEmptyTablesQuery = gql`
  query FetchAllEmptyTables{
   findAllEmptyTables{
    tables{
        id
        name
        status
        note
        groups{
          id
          name
          status
          note
        }
    }
    currentPage
    totalPage
    totalItem
  }
}
`;
function* fetchEmptyTablesSaga() {
  try {
    const { data } = yield call(order.query, {
      query: fetchAllEmptyTablesQuery,
    });
    yield put(setDataTablesNone(data.findAllEmptyTables.tables));
  } catch (error) {
    yield put(numberLengthTabledFailure('error.message'));
  }
}
function* fetchTableLengthSaga() {
  try {
    const { data } = yield call(order.query, {
      query: fetchTableLengthQuery,
    });
    yield put(numberLengthTabledSuccess(data.findAllBusyTables.tables.length));
  } catch (error) {
    yield put(numberLengthTabledFailure('Error'));
  }
}
function* fetchTableDataSaga() {
  try {
    const { data } = yield call(order.query, {
      query: fetchTableQuery,
    });
    yield put(setData(data.findAllTables.tables));
  } catch (error) {
    yield put(setError("Error"));
  }
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
  } catch (error) {
    yield put(createTableFailure("Error"));
  }
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
  } catch (error) {
    yield put(deleteTableFailure("Error"));
  }
}

export function* tableSaga() {
  yield takeEvery(deleteTable.type, deleteTableSaga);
  yield takeLatest(createTable.type, createTableFun);
  yield takeLatest(fetchTablesStart.type, fetchTableDataSaga);
  yield takeLatest(numberLengthTabled.type, fetchTableLengthSaga);
  yield takeLatest(fetchTablesNone1.type, fetchEmptyTablesSaga);
}
