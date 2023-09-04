import { combineReducers } from '@reduxjs/toolkit';
import clientSeviceReducer from './client';
import productSeviceReducer from "./product";
import inventorySeviceReducer from "./inventory";
import orderSeviceReducer from "./order";
const rootReducer = combineReducers({
    client: clientSeviceReducer,
    product: productSeviceReducer,
    inventory: inventorySeviceReducer,
    order: orderSeviceReducer,
});
export default rootReducer;
