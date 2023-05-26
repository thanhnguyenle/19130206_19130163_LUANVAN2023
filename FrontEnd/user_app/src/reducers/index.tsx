import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import navigationReducer from '../redux/navigation/navigationSlice'
const rootReducer = combineReducers({
    auth: authReducer,
    navigation: navigationReducer,
});
export default rootReducer;