import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    deleteSucess: null | boolean;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
    deleteSucess: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        fetchOrdersStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess(state, action: PayloadAction<Order[]>) {
            state.orders = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchOrdersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrder: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = '';
        },
        deleteOrderSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.deleteSucess = action.payload;
            state.error = null;
        },
        deleteOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderNull: (state) => {
            state.deleteSucess = false;
        },
    },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure, deleteOrder, deleteOrderFailure, deleteOrderSuccess, deleteOrderNull } = ordersSlice.actions;

export default ordersSlice.reducer;
