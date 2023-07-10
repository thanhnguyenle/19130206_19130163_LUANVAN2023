import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../models/category';
import { Product } from '../../models/product';

export interface CategoryProduct {
    name: string;
    description: string;
    products: [Product];
}
interface CategoryState {
    categorys: Category[];
    selectedCategorys: Category[];
    loading: boolean;
    error: string | null;
}
const initialState: CategoryState = {
    categorys: [],
    selectedCategorys: [],
    loading: false,
    error: null,
};
const categorySlice = createSlice({
    name: 'categorys',
    initialState,
    reducers: {
        addRequsetCategory: (state, action: PayloadAction<CategoryProduct>) => {
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categorys.push(action.payload);
        },
        requestListCategory: (state) => {
            console.log('2');
            state.loading = true;
            state.error = null;
        },
        fetchListCategory: (state, action: PayloadAction<Category[]>) => {
            console.log(action.payload);
            state.categorys = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCategorysFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.categorys = [];
        },
        dispatchCategorysNull(state) {
            state.selectedCategorys = [];
        },
        selectCategorys: (state, action: PayloadAction<Category>) => {
            const selectedcategoryUser = action.payload;
            const iscategorySelected = state.selectedCategorys.some(
                (categoryUser) => categoryUser.id === selectedcategoryUser.id
            );
            if (!iscategorySelected) {
                state.selectedCategorys.push(selectedcategoryUser);
            }
        },
        deselectCategory: (state, action: PayloadAction<Category>) => {
            const deselectedcategory = action.payload;
            state.selectedCategorys = state.selectedCategorys.filter((categoryUser) => categoryUser.id !== deselectedcategory.id);
        },
    },
});
export const {
    addRequsetCategory,
    addCategory,
    fetchListCategory,
    requestListCategory,
    fetchCategorysFailure,
    dispatchCategorysNull,
    selectCategorys,
    deselectCategory,
} = categorySlice.actions;

export default categorySlice.reducer;