import registerReducer from '../../redux_store/auth/registerSlice';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer1 from '../../redux_store/auth/authSlice';

const authReducer = combineReducers({
    auth: authReducer1,
    register: registerReducer,
});

export default authReducer;