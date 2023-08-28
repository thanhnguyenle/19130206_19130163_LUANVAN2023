import { combineReducers } from '@reduxjs/toolkit';
import productsReducer from '../../store/product/productSlice';
// import categoryReducer from "../../store/product/categorySlice";
const productSeviceReducer = combineReducers({
    productsSevice: productsReducer,
    // categorysSevice: categoryReducer,
});

export default productSeviceReducer;
