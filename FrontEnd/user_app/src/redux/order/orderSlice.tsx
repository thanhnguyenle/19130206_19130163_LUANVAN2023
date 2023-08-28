import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Order, OrderLineItem, OrderTable} from "../../model/order";

interface OrderState {
    idUser : string | null;
    loading: boolean;
    error: string | null;
    orders : Order[];
    createSucess: null | boolean;
}
const initialState: OrderState = {
    idUser : null,
    loading: false,
    error: null,
    orders : [],
    createSucess: null,
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
        createOrder: (state,
                      action: PayloadAction<{
                          userID: string,
                          group: string,
                          orderDate: number,
                          status: string,
                          note: string,
                          orderLineItems:OrderLineItem [],
                          tables: OrderTable[],
                      }>
        ) => {
            state.loading = true;
            state.error = '';
        },
        createOrderSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.createSucess = action.payload;
            state.error = null;
        },
        createOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    ordersRequest,
    ordersSuccess,
    ordersFailure,
    createOrderFailure,
    createOrderSuccess,
    createOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
