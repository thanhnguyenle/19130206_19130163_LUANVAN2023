import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialAll, MaterialSetup, MaterialSetupDefault } from "../../models/inventory";

interface MaterialState {
  loading: boolean;
  error: string | null;
  listMaterials: MaterialSetup[];
  listMaterialAll: MaterialAll[];
  isSetDefault : boolean | null;
}

const initialState: MaterialState = {
  loading: false,
  error: null,
  listMaterials: [],
  listMaterialAll:[],
  isSetDefault: null,

};

const cancellationSlice = createSlice({
  name: 'cancellation',
  initialState,
  reducers: {
    requestMaterialsSetup: (state) => {
      state.loading = true;
      state.error = null;
    },
    listMaterialsSetup: (state, action: PayloadAction<MaterialSetup[]>) => {
      state.loading = true;
      state.error = null;
      state.listMaterials = action.payload;
    },
    listMaterialsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    requestMaterialsAll: (state) => {
      state.loading = true;
      state.error = null;
    },
    listMaterialsAll: (state, action: PayloadAction<MaterialAll[]>) => {
      state.loading = true;
      state.error = null;
      state.listMaterialAll = action.payload;
    },
    listMaterialsAllFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    requestSetDefault: (state, action: PayloadAction<MaterialSetupDefault[]>) => {
      state.loading = true;
      state.error = null;
    },
    setDefaultMaterials: (state, action: PayloadAction<boolean>) => {
      state.loading = true;
      state.error = null;
      state.isSetDefault = action.payload;
    },
    setDefaultMaterialFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  requestSetDefault,
  setDefaultMaterialFailure,
  setDefaultMaterials,
  listMaterialsAllFailure,
  requestMaterialsAll,
  listMaterialsAll,
  requestMaterialsSetup,
  listMaterialsSetup,
  listMaterialsFailure
} = cancellationSlice.actions;
export default cancellationSlice.reducer;
