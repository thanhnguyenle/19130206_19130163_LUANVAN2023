import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../models/product';
import { Category } from '../../models/categorys';


interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    product: Product;
    editSuccess: null | boolean;
}
const productModel: Product = {
    id: '1',
    name: "Tên sản phẩm",
    description: "Mô tả",
    categories: [{ id: "1", name: "Category 1", description: 'c' },],
    images: ['https://cdn.tgdd.vn/2021/06/CookProduct/1(1)-1200x676-1.jpg'],
    price: '0.0',
    quantity: '0',
    unit: 'VND',
    status: 'No'
};
const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    product: productModel,
    editSuccess: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchProductRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsDetail(state, action: PayloadAction<Product>) {
            state.product = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchProductFailure: (state, action: PayloadAction<string>) => {
            state.product = productModel;
            state.loading = false;
            state.error = action.payload;
        },
        editProductRequest(state, action: PayloadAction<{
            id: string,
            name: string,
            description: string,
            images: string[],
            price: string,
            quantity: string,
            status: string,
            unit: string,
            categories: string[],
        }>) {
            state.loading = true;
            state.error = null;
        },
        editProductSuccess(state, action: PayloadAction<boolean>) {
            state.editSuccess = action.payload;
            state.loading = false;
            state.error = null;
        },
        editProductFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    editProductRequest,
    editProductSuccess,
    editProductFailure,
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductsDetail,
    fetchProductRequest,
    fetchProductFailure
} = productSlice.actions;

export default productSlice.reducer;