import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory, MaterialReturn, Supplier } from "../../models/inventory";
import ReceiptOrderOutput from "../../models/ReceiptOrderOutput";
import { PaySlipOrderOutput } from "../../models/paySlipOrders";
const inventoryModel: Inventory = {
  id: '',
  name:'',
  description:'',
  expiredDate:1,
  images:[],
  price:0,
  manufacturerDate:0,
  quantity:0,
  status:'INACTIVE',
  unit:'',
};
interface InventoryState {
  loading: boolean;
  error: string | null;
  listInventors: Inventory[];
  detailMaterial : Inventory;
  isDeleteMaterial: boolean | null;
  isCreateMaterial: boolean | null;
  listMaterialReturn: MaterialReturn[];
  listSuppliers: Supplier[];
}

const initialState: InventoryState = {
  loading: false,
  error: null,
  listInventors: [],
  detailMaterial:inventoryModel,
  isDeleteMaterial: null,
  isCreateMaterial: null,
  listMaterialReturn:[],
  listSuppliers: [],
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    requestInventors: (state) => {
      state.loading = true;
      state.error = null;
    },
    listInventors: (state, action: PayloadAction<Inventory[]>) => {
      state.loading = true;
      state.error = null;
      state.listInventors = action.payload;
    },
    listInventorsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    detailInventoryRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = '';
    },
    detailInventorySuccess: (state, action: PayloadAction<Inventory>) => {
      state.detailMaterial = action.payload;
      state.loading = false;
      state.error = null;
    },
    detailInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInventory: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = '';
    },
    deleteInventorySuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isDeleteMaterial = action.payload;
      state.error = null;
    },
    deleteInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteInventoryNull: (state) => {
      state.isDeleteMaterial = false;
    },
    createInventory: (state ,action: PayloadAction<{
      name:string,
      price: number,
      unit:string,
      quantity:number,
      status:string,
      description:string,
      expiredDate: number,
      manufacturerDate:number,
   }>
    ) => {
      state.loading = true;
      state.error = '';
    },
    createInventorySuccess: (state, action: PayloadAction<boolean>) => {
      state.isCreateMaterial = action.payload;
      state.loading = false;
      state.error = null;
    },
    createInventoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createInventoryNull: (state) => {
      state.isCreateMaterial = null;
    },
    /////
    requestMaterialReturns: (state) => {
      console.log(2)
      state.loading = true;
      state.error = null;
    },
    listMaterialReturns: (state, action: PayloadAction<MaterialReturn[]>) => {
      state.loading = false;
      state.error = null;
      state.listMaterialReturn = action.payload;
    },
    listMaterialReturnFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    //////////////////
    requestSuppliers: (state) => {
      state.loading = true;
      state.error = null;
    },
    listSuppliersSuccess: (state, action: PayloadAction<Supplier[]>) => {
      state.loading = false;
      state.error = null;
      state.listSuppliers = action.payload;
      console.log(action.payload)
    },
    listSuppliersFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  listSuppliersFailure,
  requestSuppliers,
  listSuppliersSuccess,
  requestMaterialReturns,
  listMaterialReturnFailure,
  listMaterialReturns,
  createInventory,
  createInventorySuccess,
  createInventoryNull,
  createInventoryFailure,
  deleteInventoryNull,
  deleteInventoryFailure,
  deleteInventorySuccess,
  deleteInventory,
  detailInventoryRequest,
  detailInventorySuccess,
  detailInventoryFailure,
  requestInventors,
  listInventorsFailure,
  listInventors
} = inventorySlice.actions;
export default inventorySlice.reducer;
