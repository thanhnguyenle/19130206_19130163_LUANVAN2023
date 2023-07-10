import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import navigationReducer from '../redux_store/navigation/navigationSlice';
import adminReducer from './navigation';
import clientSeviceReducer from './client';
import productSeviceReducer from './product';
import orderSeviceReducer from './order';
const rootReducer = combineReducers({
    navigation: navigationReducer,
    admiNavigation: adminReducer,
    auth: authReducer,
    client: clientSeviceReducer,
    product: productSeviceReducer,
    order: orderSeviceReducer,
});
export default rootReducer;