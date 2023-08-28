import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Product} from "../../../model/product";
import {Category} from "../../../model/category";

export interface CategoryProduct {
    name: string;
    description: string;
    products: [Product];
}
interface CategoryState {
    categorys: Category[];
    loading: boolean;
    error: string | null;
}
const initialState: CategoryState = {
    categorys: [],
    loading: false,
    error: null,
};
const categorySlice = createSlice({
    name: 'categorys',
    initialState,
    reducers: {
        requestListCategory: (state) => {
            console.log('Hi');
            state.loading = true;
            state.error = null;
        },
        fetchListCategory: (state, action: PayloadAction<Category[]>) => {
            state.categorys = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCategorysFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.categorys = [];
        },
    },
});
export const {
    fetchListCategory,
    requestListCategory,
    fetchCategorysFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
