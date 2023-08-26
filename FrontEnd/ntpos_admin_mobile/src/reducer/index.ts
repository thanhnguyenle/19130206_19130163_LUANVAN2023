import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import navigationReducer from '../redux_store/navigation/navigationSlice';
import adminReducer from './navigation';
import clientSeviceReducer from './client';
import productSeviceReducer from './product';
import orderSeviceReducer from './order';
import tableSeviceReducer from './table';
import orderReturnService from './orderReturn';
import paymentReturnReducer from "./payment";
import inventoryReducer from "./inventory";
const rootReducer = combineReducers({
    navigation: navigationReducer,
    admiNavigation: adminReducer,
    auth: authReducer,
    client: clientSeviceReducer,
    product: productSeviceReducer,
    order: orderSeviceReducer,
    table: tableSeviceReducer,
    orderReturn : orderReturnService,
    payment: paymentReturnReducer,
    inventory: inventoryReducer,
});
export default rootReducer;
