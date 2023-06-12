import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../../redux_store/client/clientSlice';
import userDetailReducer from '../../redux_store/client/detailClientSlice';
import deleteUserReduce from '../../redux_store/client/deleteClientSlice';
import rolesReducer from '../../redux_store/client/listRoleSlice';
import groupReducer from '../../redux_store/client/group/groupSlice';
import searchFitter from '../../redux_store/client/filterSlice';
const clientReducer = combineReducers({
    users: userReducer,
    userDetail: userDetailReducer,
    deleteUser: deleteUserReduce,
    roles: rolesReducer,
    groups: groupReducer,
    searchFifter: searchFitter,
});

export default clientReducer;