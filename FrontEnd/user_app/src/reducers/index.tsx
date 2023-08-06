import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import navigationReducer from '../redux/navigation/navigationSlice'
import orderReducer from './order';
const rootReducer = combineReducers({
    auth: authReducer,
    navigation: navigationReducer,
    order: orderReducer,
});
export default rootReducer;