import { combineReducers } from '@reduxjs/toolkit';
import inventoryService from '../../redux_store/inventory/InventorySlice';
import cancellationService from '../../redux_store/cancellation/CancellationSlice';
const inventoryReducer = combineReducers({
  inventoryService: inventoryService,
  cancellationService: cancellationService,
});
export default inventoryReducer;
