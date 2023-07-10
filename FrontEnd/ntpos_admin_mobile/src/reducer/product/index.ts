import { Product } from './../../models/product';
import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../../redux_store/product/productSlice';
import categoryReducer from '../../redux_store/product/categorySlice';
const productSeviceReducer = combineReducers({
    products: productsReducer,
    categorys: categoryReducer,
});

export default productSeviceReducer;