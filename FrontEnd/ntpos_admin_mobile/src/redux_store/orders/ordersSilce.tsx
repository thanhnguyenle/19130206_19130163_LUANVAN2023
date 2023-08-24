import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderLineItem, OrderTable } from "../../models/order";
import { PaySlipOrderOutput } from "../../models/paySlipOrders";

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
    deleteSucess: null | boolean;
    createSucess: null | boolean;
    editSuccess : null | boolean;
    orderDetail : Order;
}
const orderModel : Order = {
    id:'',
    status:'',
    note:'',
    group:'',
    orderDate:0,
    orderLineItems:[],
    tables:[],
    userID:''
}
const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
    deleteSucess: null,
    createSucess: null,
    editSuccess: null,
    orderDetail: orderModel,
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
            state.deleteSucess = null;
        },
        createOrder: (state,
            action: PayloadAction<{
                userID: string,
                group: string,
                orderDate: string,
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
        editTableOrderRequest(state,
                           action: PayloadAction<{
                               id:string,
                               userID: string,
                               group: string,
                               orderDate: number,
                               status: string,
                               note:string,
                               orderLineItems: OrderLineItem[],
                               tables: OrderTable[],
                           }>
        ) {
            state.loading = true;
            state.error = null;
        },
        editTableOrderSuccess(state, action: PayloadAction<boolean>) {
            state.editSuccess = action.payload;
            state.loading = false;
            state.error = null;
        },
        editTableOrderFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        detailOrder: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = '';
        },
        detailOrderSuccess: (state, action: PayloadAction<Order>) => {
            state.orderDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        detailOrderFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        detailOrderNull: (state) => {
            state.orderDetail = orderModel;
        },
    },
});

export const {
    detailOrder,
    detailOrderSuccess,
    detailOrderFailure,
    detailOrderNull,
    editTableOrderRequest,
    editTableOrderSuccess,
    editTableOrderFailure,
    createOrder,
    createOrderSuccess,
    createOrderFailure,
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    deleteOrder,
    deleteOrderFailure,
    deleteOrderSuccess,
    deleteOrderNull
} = ordersSlice.actions;

export default ordersSlice.reducer;
