import { combineReducers } from '@reduxjs/toolkit';
import navigationReduer from '../../redux_store/navigation/navigationClient'
const adminReducer = combineReducers({
    clientNavigation: navigationReduer
});

export default adminReducer;