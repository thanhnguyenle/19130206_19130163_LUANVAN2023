import { Product } from './../../models/product';
import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../../redux_store/product/productSlice';
const productSeviceReducer = combineReducers({
    products: productsReducer,
});

export default productSeviceReducer;