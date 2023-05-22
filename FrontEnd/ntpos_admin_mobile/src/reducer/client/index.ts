import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../../redux_store/client/clientSlice';
import userDetailReducer from '../../redux_store/client/detailClientSlice';
import deleteUserReduce from '../../redux_store/client/deleteClientSlice';
import rolesReducer from '../../redux_store/client/listRoleSlice';
const clientReducer = combineReducers({
    users: userReducer,
    userDetail: userDetailReducer,
    deleteUser: deleteUserReduce,
    roles: rolesReducer,
});

export default clientReducer;