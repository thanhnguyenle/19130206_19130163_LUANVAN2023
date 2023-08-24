import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../../store/client/clientSlice';
import groupReducer from '../../store/client/group/groupSlice';
const clientSeviceReducer = combineReducers({
    users: userReducer,
    groups: groupReducer,
});

export default clientSeviceReducer;
