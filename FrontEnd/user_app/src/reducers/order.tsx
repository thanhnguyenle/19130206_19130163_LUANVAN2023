import { combineReducers } from '@reduxjs/toolkit';
import orderSlice from '../redux/order/orderSlice';
import tableSlice from "../redux/table/TableSlice";
import GroupTableSlice from "../redux/table/groupTableSlice";
const orderReducer = combineReducers({
    orders: orderSlice,
    tables: tableSlice,
    groupTables: GroupTableSlice,
});

export default orderReducer;
