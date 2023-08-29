import { combineReducers } from '@reduxjs/toolkit';
import orderReducer from "../../store/order/orderSlice";
import tableReducer from "../../store/table/tableSlice";
const orderSeviceReducer = combineReducers({
    order: orderReducer,
    table: tableReducer,
});
export default orderSeviceReducer;
