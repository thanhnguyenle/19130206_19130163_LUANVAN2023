import { combineReducers } from '@reduxjs/toolkit';
import clientSeviceReducer from './client';
const rootReducer = combineReducers({
    client: clientSeviceReducer,
});
export default rootReducer;