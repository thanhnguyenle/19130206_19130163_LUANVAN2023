import { combineReducers } from '@reduxjs/toolkit';
import paymentReturnService from '../../redux_store/payment/PaymentSlice';
const paymentReturnReducer = combineReducers({
  paymentReturnService: paymentReturnService,
});
export default paymentReturnReducer;
