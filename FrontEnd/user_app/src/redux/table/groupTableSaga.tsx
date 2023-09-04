import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { gql } from "@apollo/client";
import {order} from "../../constants/apollo";
import { setData, setError, fetchGroupTablesStart, createGroupTableSuccess, createGroupTableFailure, createGroupTable, deleteGroupTableSuccess, deleteGroupTableFailure, deleteGroupTable } from './groupTableSlice';
export const fetchGroupTableQuery = gql`
  query FetchGroupTables{
    findAllGroup{
        id
        name
        status
        note
        tables{
         id
         name
         numberOfPeople
         isBusy
         status
        }
    }
}
`;
const fetchCreateGroupTableQuery = gql`
    mutation FetchCreateGroupTable(
            $name:String,
            $note:String,
            $status:String
            $tables:[String],
        ) {
        createGroup (
            groupInput:{
            name:$name
            note: $note
            status:$status
            tables:$tables
        }){
            id
        }
    }
`;
export const fetchDeleteGroupTableQuery = gql`
  mutation($id: String){
    deleteGroup(id:$id){
      id
    }
  }
`;
function* fetchGroupTableDataSaga() {
    try {
        const { data } = yield call(order.query, {
            query: fetchGroupTableQuery,
        });
        console.log(data.findAllTables);
        yield put(setData(data.findAllGroup));
    } catch (error: any) {
        yield put(setError(error.message));
    }
}

export function* groupTableSaga() {
    yield takeLatest(fetchGroupTablesStart.type, fetchGroupTableDataSaga);
}
function* createGroupTableFun(action: any): Generator<any, any, any> {
    try {
        const { name, note, status, tables, } = action.payload;
        const { data } = yield call(order.mutate, {
            mutation: fetchCreateGroupTableQuery,
            variables: {
                name: name,
                note: note,
                status: status,
                tables: tables,
            }
        });
        if (data.createGroup.id !== null) {
            yield put(createGroupTableSuccess(true));
        }
    } catch (error: any) {
        yield put(createGroupTableFailure(error.message));
    }
}


export function* watchCreateGroupTable() {
    yield takeLatest(createGroupTable.type, createGroupTableFun);
}

function* deleteGroupTableSaga(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const { data } = yield call(order.mutate, {
            mutation: fetchDeleteGroupTableQuery,
            variables: {
                id: action.payload,
            },
        });
        yield put(deleteGroupTableSuccess(data.deleteGroup.id === action.payload));
    } catch (error: any) {
        yield put(deleteGroupTableFailure(error.message));
    }
}

export function* watchDeleteGroupTable() {
    yield takeEvery(deleteGroupTable.type, deleteGroupTableSaga);
}
