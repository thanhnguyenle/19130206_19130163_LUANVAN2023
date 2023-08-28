import { combineReducers } from '@reduxjs/toolkit';
import categorySlice from "../redux/product/category/CategorySlice";
import productSlice from "../redux/product/product1/ProductSlice";
const productReducer = combineReducers({
    categorys: categorySlice,
    products: productSlice
});

export default productReducer;
