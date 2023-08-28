import { combineReducers } from '@reduxjs/toolkit';
import inventoryService from '../../redux_store/inventory/InventorySlice';
const inventoryReducer = combineReducers({
  inventoryService: inventoryService,
});
export default inventoryReducer;
