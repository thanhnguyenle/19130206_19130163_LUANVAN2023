import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import navigationReducer from '../redux/navigation/navigationSlice'
import orderReducer from './order';
import productReducer from "./product";
import paymentReturnReducer from "./payment";
const rootReducer = combineReducers({
    auth: authReducer,
    navigation: navigationReducer,
    order: orderReducer,
    product:productReducer,
    payment: paymentReturnReducer,
});
export default rootReducer;
