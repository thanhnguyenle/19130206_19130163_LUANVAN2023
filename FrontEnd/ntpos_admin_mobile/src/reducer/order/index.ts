import { combineReducers } from '@reduxjs/toolkit';
import orderSevice from '../../redux_store/orders/ordersSilce'
const orderReducer = combineReducers({
    orderSevice: orderSevice
});

export default orderReducer;