import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import clientReducer from './client';
import navigationReducer from '../redux_store/navigation/navigationSlice';
const rootReducer = combineReducers({
    navigation: navigationReducer,
    auth: authReducer,
    client: clientReducer,
});
export default rootReducer;