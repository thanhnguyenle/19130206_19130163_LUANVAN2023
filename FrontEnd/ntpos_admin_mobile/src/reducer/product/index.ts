import { Product } from './../../models/product';
import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../../redux_store/product/productSlice';
import categoryReducer from '../../redux_store/product/categorySlice';
import fifterProductReducer from '../../redux_store/product/fifterProductSlice'
const productSeviceReducer = combineReducers({
    productsSevice: productsReducer,
    categorysSevice: categoryReducer,
    fifter: fifterProductReducer,
});

export default productSeviceReducer;