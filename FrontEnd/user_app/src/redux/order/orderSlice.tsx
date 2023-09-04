import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Order, OrderLineItem, OrderTable} from "../../model/order";
import {User} from "../../model/user";

interface OrderState {
    idUser : string | null;
    loading: boolean;
    error: string | null;
    orders : Order[];
    createSucess: null | boolean;
    orderDetail : Order;
    userDetail: User;
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
const userModel : User ={
    id:'',
    registeredAt:'',
    password:'',
    name:'',
    phoneNumber:'',
    groups:[],
    avatar:'',
    address:'',
    email:'',
    username:''
}
const initialState: OrderState = {
    idUser : null,
    loading: false,
    error: null,
    orders : [],
    createSucess: null,
    orderDetail: orderModel,
    userDetail:userModel,
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
        fetchDetailUserRequest: (state, action: PayloadAction<String>) => {
            state.loading = true;
            state.error = null;
        },
        fetchDetailUserSuccess: (state, action: PayloadAction<User>) => {
            state.userDetail = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchDetailUserFailure: (state, action: PayloadAction<string>) => {
            state.userDetail = userModel;
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export const {
    fetchDetailUserSuccess,
    fetchDetailUserFailure,
    fetchDetailUserRequest,
    ordersRequest,
    ordersSuccess,
    ordersFailure,
    createOrderFailure,
    createOrderSuccess,
    createOrder,
    detailOrderFailure,
    detailOrderNull,
    detailOrderSuccess,
    detailOrder
} = orderSlice.actions;
export default orderSlice.reducer;
