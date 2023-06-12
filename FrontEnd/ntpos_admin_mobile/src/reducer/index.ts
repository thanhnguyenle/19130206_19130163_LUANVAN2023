import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import clientReducer from './client';
import navigationReducer from '../redux_store/navigation/navigationSlice';
import adminReducer from './navigation';
const rootReducer = combineReducers({
    navigation: navigationReducer,
    admiNavigation: adminReducer,
    auth: authReducer,
    client: clientReducer,
});
export default rootReducer;