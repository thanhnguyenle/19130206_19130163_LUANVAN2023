import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Supplier} from "../../models/supplier";
export interface SupplierState {
    suppliers: Supplier[];
    loading: boolean;
    error: string | null;

}
const initialState: SupplierState = {
    suppliers: [],
    loading: false,
    error: null,
};
const supplierSlice = createSlice({
    name: 'supplier',
    initialState: initialState,
    reducers: {
        fetchSuppliersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSuppliersSuccess: (state, action: PayloadAction<Supplier[]>) => {
            state.loading = false;
            state.error = null;
            state.suppliers = action.payload;
        },
        fetchSuppliersFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.suppliers = [];
        },
    },
});

export const {
    fetchSuppliersRequest,
    fetchSuppliersSuccess,
    fetchSuppliersFailure
} = supplierSlice.actions;

export default supplierSlice.reducer;
