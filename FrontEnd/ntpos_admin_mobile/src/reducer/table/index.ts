import { combineReducers } from '@reduxjs/toolkit';
import tableReducer from '../../redux_store/table/tableSlice';
import groupTablesReducer from '../../redux_store/table/groupTableSlice';
const tableSeviceReducer = combineReducers({
    tableSevice: tableReducer,
    groupTablesSevice: groupTablesReducer,
});

export default tableSeviceReducer;