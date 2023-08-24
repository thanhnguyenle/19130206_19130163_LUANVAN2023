import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Table } from '../../models/table';
import { PaySlipOrderOutput } from "../../models/paySlipOrders";
import {  OrderReturn } from "../../models/orderReturn";
import { OrderLineItem ,OrderTable} from "../../models/order";
const paySlipOrderModel: PaySlipOrderOutput = {
  id: '1',
  accountReceive:'0',
  accountSend:'0',
  orderReturnID:'',
  status:'',
  description:'',
  createdAt:0,
  total:0,
  paymentType:'0',
  totalReceive:0,
  totalReturn:0
};
const orderReturn: OrderReturn = {
  orderID:'',
  note:'',
  group:'',
  orderReturnDate:0,
  status:'',
  orderLineItemsReturn:[],
  tablesReturn:[],
  userID:'',
  id:''
}


interface OrderReturnState {
  paySlipOrders: PaySlipOrderOutput[];
  loading: boolean;
  error: string | null;
  selectedTables: Table[];
  isCreateGroupTable: boolean | null;
  isDeleteSuccess: boolean | null;
  paySlipOrder: PaySlipOrderOutput;
  createOrderReturn : boolean | null;
  idOrder:string | null;
  orderReturnList : OrderReturn[];
  isDeleteOrderReturn: boolean | null;
  isCreatePaySlipOrder : boolean | null;
  orderReturn : OrderReturn;
}

const initialState: OrderReturnState = {
  paySlipOrders: [],
  loading: false,
  error: null,
  selectedTables: [],
  isCreateGroupTable: null,
  isDeleteSuccess: null,
  paySlipOrder: paySlipOrderModel,
  idOrder: null,
  createOrderReturn: null,
  orderReturnList: [],
  isDeleteOrderReturn: null,
  isCreatePaySlipOrder: null,
  orderReturn: orderReturn,
};

const orderReturnSlice = createSlice({
  name: 'orderReturn',
  initialState,
  reducers: {
    fetchPaySlipOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    setPaySlipOrders(state, action: PayloadAction<PaySlipOrderOutput[]>) {
      state.paySlipOrders = action.payload;
      state.loading = false;
    },
    setPaySlipOrderError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    deletePaySlipOrder: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = '';
    },
    deletePaySlipOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.isDeleteSuccess = action.payload;
      state.loading = false;
      state.error = null;
    },
    deletePaySlipOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePaySlipOrderNull: (state) => {
      state.isDeleteSuccess = null;
    },
    detailPaySlipOrder: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = '';
    },
    detailPaySlipOrderSuccess: (state, action: PayloadAction<PaySlipOrderOutput>) => {
      state.paySlipOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    detailPaySlipOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    detailPaySlipOrderNull: (state) => {
      state.paySlipOrder = paySlipOrderModel;
    },
    createPaySlipOrder: (state ,action: PayloadAction<{
      orderReturnID:string,
      total: number,
      totalReceive:number,
      totalReturn:number,
      status:string,
      description:string,
      paymentType: string,
      accountReceive:string,
      accountSend:string, }>
    ) => {
      state.loading = true;
      state.error = '';
    },
    createPaySlipOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.isCreatePaySlipOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    createPaySlipOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createPaySlipOrderNull: (state) => {
      state.isCreatePaySlipOrder = null;
    },
    //
    createOrderReturn: (state ,action: PayloadAction<{
                          userID: string,
                          orderID: string,
                          group: string,
                          status: string,
                          note:string,
                          orderLineItemsReturn: OrderLineItem[],
                          tablesReturn: OrderTable[],
                        }>
    ) => {
      state.loading = true;
      state.error = '';
    },
    createOrderReturnSuccess: (state, action: PayloadAction<boolean>) => {
      state.createOrderReturn = action.payload;
      state.loading = false;
      state.error = null;
    },
    createOrderReturnFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderReturnNull: (state) => {
      state.createOrderReturn = null;
    },
    idOrderSuccess: (state, action: PayloadAction<string>) => {
      state.idOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    idOrderNull: (state) => {
      state.idOrder = null;
    },
    fetchOrderReturnsStart(state) {
      state.loading = true;
      state.error = null;
    },
    setOrderReturns(state, action: PayloadAction<OrderReturn[]>) {
      state.orderReturnList = action.payload;
      state.loading = false;
    },
    setOrderReturnsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteOrderReturns: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = '';
    },
    deleteOrderReturnsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isDeleteOrderReturn = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteOrderReturnsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderReturnsNull: (state) => {
      state.isDeleteOrderReturn = null;
    },
    // detail OrderReturn
    detailOrderReturn: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = '';
    },
    detailOrderReturnSuccess: (state, action: PayloadAction<OrderReturn>) => {
      state.orderReturn = action.payload;
      state.loading = false;
      state.error = null;
    },
    detailOrderReturnFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    detailOrderReturnNull: (state) => {
      state.orderReturn = orderReturn;
    },
  },
});

export const {
  detailOrderReturn,
  detailOrderReturnSuccess,
  detailOrderReturnFailure,
  detailOrderReturnNull,
  createPaySlipOrder,
  createPaySlipOrderSuccess,
  createPaySlipOrderFailure,
  createPaySlipOrderNull,
  deleteOrderReturnsNull,
  deleteOrderReturns,
  deleteOrderReturnsSuccess,
  deleteOrderReturnsFailure,
  fetchOrderReturnsStart,
  setOrderReturns,
  setOrderReturnsError,
  createOrderReturn,
  createOrderReturnSuccess,
  createOrderReturnFailure,
  createOrderReturnNull,
  idOrderSuccess,
  idOrderNull,
  detailPaySlipOrder,
  detailPaySlipOrderSuccess,
  detailPaySlipOrderNull,
  detailPaySlipOrderFailure,
  deletePaySlipOrder,
  deletePaySlipOrderSuccess,
  deletePaySlipOrderFailure,
  deletePaySlipOrderNull,
  fetchPaySlipOrdersStart,
  setPaySlipOrders,
  setPaySlipOrderError} = orderReturnSlice.actions;

export default orderReturnSlice.reducer;
