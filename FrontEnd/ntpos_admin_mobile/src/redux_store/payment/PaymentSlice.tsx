import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ReceiptOrderOutput from "../../models/ReceiptOrderOutput";

interface PaymentState {
  loading: boolean;
  success: boolean;
  error: string | null;
  // method: 'COD' | 'PAYPAL' | null;
  method: string | null;
  isDeleteSuccess : boolean | null;
  isCreateReceiptOrder : boolean | null;
  listReceiptOrder : ReceiptOrderOutput[];
  ReceiptOrderDetail : ReceiptOrderOutput;
}
const ReceiptOrder : ReceiptOrderOutput = {
  id :'',
  orderID:'',
  total:0,
  totalReceive:0,
  totalReturn:0,
  status:'',
  description:'',
  paymentType:'',
  createdAt:'',
}
const initialState: PaymentState = {
  loading: false,
  success: false,
  error: null,
  method:null,
  isCreateReceiptOrder:null,
  isDeleteSuccess: null,
  listReceiptOrder:[],
  ReceiptOrderDetail :ReceiptOrder,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    detailReceiptOrderRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    detailReceiptOrder: (state, action: PayloadAction<ReceiptOrderOutput>) => {
      state.loading = true;
      state.error = null;
      state.ReceiptOrderDetail = action.payload;
    },
    detailReceiptOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    paymentMethod: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.method =  action.payload;
      state.error = null;
    },
    paymentMethodNull: (state) => {
      state.loading = false;
      state.method = null;
      state.error = null;
    },
    paymentSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    paymentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    createReceiptOrderRequest: (state,  action: PayloadAction<{
      orderID:string,
      total: number,
      totalReceive:number,
      totalReturn:number,
      status:string,
      description:string,
      paymentType: string,
      accountReceive:string,
      accountSend:string,
    }>) => {
      state.loading = true;
      state.error = null;
    },
    createReceiptOrderSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isCreateReceiptOrder = action.payload;
      state.error = null;
    },
    createReceiptOrderNull: (state) => {
      state.loading = false;
      state.isCreateReceiptOrder = null;
      state.error = null;
    },
    createReceiptOrderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchReceiptOrdersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReceiptOrdersSuccess(state, action: PayloadAction<ReceiptOrderOutput[]>) {
      state.listReceiptOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDeleteReceiptOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchDeleteReceiptOrdersStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    fetchDeleteReceiptOrdersSuccess(state, action: PayloadAction<boolean>) {
      state.isDeleteSuccess = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchDeleteReceiptOrdersNull(state) {
      state.loading = false;
      state.isDeleteSuccess = null;
      state.error = null;
    },
    fetchReceiptOrdersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDeleteReceiptOrdersNull,
  fetchDeleteReceiptOrdersFailure,
  fetchDeleteReceiptOrdersSuccess,
  fetchDeleteReceiptOrdersStart,
  fetchReceiptOrdersStart,
  fetchReceiptOrdersSuccess,
  fetchReceiptOrdersFailure,
  paymentMethod,
  paymentMethodNull,
  createReceiptOrderRequest,
  createReceiptOrderSuccess,
  createReceiptOrderFailure,
  detailReceiptOrderFailure,
  detailReceiptOrderRequest,
  detailReceiptOrder,
} = paymentSlice.actions;

export default paymentSlice.reducer;
