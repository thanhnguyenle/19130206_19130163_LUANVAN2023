import { combineReducers } from '@reduxjs/toolkit';
import supplierReducer from "../../store/supplier/SupplierSlice";
const inventorySeviceReducer = combineReducers({
    supplier: supplierReducer,
});

export default inventorySeviceReducer;
