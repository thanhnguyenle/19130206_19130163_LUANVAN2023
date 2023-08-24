import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
    idUser : string | null;
    loading: boolean;
    error: string | null;
    orders : Order[];
}
const initialState: OrderState = {
    idUser : null,
    loading: false,
    error: null,
    orders : [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        ordersRequest: (state, action: PayloadAction<string>) => {
            state.idUser = action.payload;
            state.loading = true;
            state.error = null;
        },
        ordersSuccess: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
            state.error = null;
        },
        ordersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
      
    },
});

export const { ordersRequest,ordersSuccess,ordersFailure} = orderSlice.actions;
export default orderSlice.reducer;