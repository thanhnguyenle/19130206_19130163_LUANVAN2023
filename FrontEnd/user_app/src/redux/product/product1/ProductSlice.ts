import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Product} from "../../../model/product";


interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
    product: Product;
    editSuccess: null | boolean;
    createSucess: null | boolean;
    deleteSucess: null | boolean;
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
    editSuccess: null,
    createSucess: null,
    deleteSucess: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsNull(state) {
            state.products = [];
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
        editProductRequest(state,
                           action: PayloadAction<{
                               id: string,
                               name: string,
                               description: string,
                               images: string[],
                               price: string,
                               quantity: string,
                               status: string,
                               unit: string,
                               categories: string[],
                           }>
        ) {
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
        createProduct: (state,
                        action: PayloadAction<{
                            name: string,
                            description: string,
                            images: string[],
                            price: string,
                            quantity: string,
                            status: string,
                            unit: string,
                            categories: string[],
                        }>
        ) => {
            state.loading = true;
            state.error = '';
        },
        createProductSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.createSucess = action.payload;
            state.error = null;
        },
        createProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        sortProducts: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case 'ascending':
                    const sortedProducts = [...state.products].sort((a, b) => b.name.localeCompare(a.name));
                    return {
                        ...state,
                        products: sortedProducts,
                    };
                case 'oldest':
                    const sortedProducts1 = [...state.products].sort((a, b) => a.name.localeCompare(b.name));
                    return {
                        ...state,
                        products: sortedProducts1,
                    };
                default:
                    return state;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = '';
        },
        deleteProductSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.deleteSucess = action.payload;
            state.error = null;
        },
        deleteProductFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteProductNull: (state) => {
            state.deleteSucess = false;
        },
    },
});

export const {
    deleteProductNull,
    deleteProduct,
    deleteProductSuccess,
    deleteProductFailure,
    createProduct,
    createProductSuccess,
    createProductFailure,
    editProductRequest,
    editProductSuccess,
    editProductFailure,
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductsDetail,
    fetchProductRequest,
    fetchProductFailure,
    sortProducts,
    fetchProductsNull
} = productSlice.actions;

export default productSlice.reducer;
