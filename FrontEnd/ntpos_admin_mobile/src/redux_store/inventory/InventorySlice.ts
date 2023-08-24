import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inventory } from "../../models/inventory";
import ReceiptOrderOutput from "../../models/ReceiptOrderOutput";

interface InventoryState {
  loading: boolean;
  error: string | null;
  listInventors: Inventory[];
}

const initialState: InventoryState = {
  loading: false,
  error: null,
  listInventors: [],
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
  },
});

export const { requestInventors,listInventorsFailure,listInventors } = inventorySlice.actions;
export default inventorySlice.reducer;
