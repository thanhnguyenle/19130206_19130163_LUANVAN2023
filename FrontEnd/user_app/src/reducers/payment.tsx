import { combineReducers } from '@reduxjs/toolkit';
import paymentReturnService from '../redux/payment/PaymentSlice';
const paymentReturnReducer = combineReducers({
    paymentReturnService: paymentReturnService,
});
export default paymentReturnReducer;
