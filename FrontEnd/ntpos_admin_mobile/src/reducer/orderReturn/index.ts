import { combineReducers } from '@reduxjs/toolkit';
import orderReturnService from '../../redux_store/order_return/OrderReturnSlice';
const orderReturnReducer = combineReducers({
  orderReturnService: orderReturnService,
});
export default orderReturnReducer;
