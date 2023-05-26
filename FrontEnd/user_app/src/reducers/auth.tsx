import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../redux/auth/loginSlice';
import registerReducer from '../redux/auth/registerSlice'
const authReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
});

export default authReducer;