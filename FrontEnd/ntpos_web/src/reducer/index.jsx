import { combineReducers } from '@reduxjs/toolkit';
import clientSeviceReducer from './client';
import productSeviceReducer from "./product";
import inventorySeviceReducer from "./inventory";
const rootReducer = combineReducers({
    client: clientSeviceReducer,
    product: productSeviceReducer,
    inventory: inventorySeviceReducer,
});
export default rootReducer;
