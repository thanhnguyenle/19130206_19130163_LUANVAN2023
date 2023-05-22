import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from '../../redux/auth/loginSlice';
const authReducer = combineReducers({
  login: loginReducer,
});

export default authReducer;
