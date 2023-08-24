import { combineReducers } from '@reduxjs/toolkit';
import orderSlice from '../redux/order/orderSlice';
const orderReducer = combineReducers({
    orders: orderSlice,
});

export default orderReducer;