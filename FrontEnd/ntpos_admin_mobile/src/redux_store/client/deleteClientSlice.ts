import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeleteClientState {
    loading: boolean;
    error: string | null;
    deleteSuccess: boolean | null;
}

const initialState: DeleteClientState = {
    deleteSuccess: null,
    loading: false,
    error: null,
};

const deleteClientSlice = createSlice({
    name: 'deleteClient',
    initialState,
    reducers: {
        deleteClientRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteClientSuccess: (state, action: PayloadAction<boolean>) => {
            state.deleteSuccess = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteClientFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteClientNull: (state) => {
            state.deleteSuccess = false;
        },
    },
});

export const {
    deleteClientNull,
    deleteClientRequest,
    deleteClientSuccess,
    deleteClientFailure,
} = deleteClientSlice.actions;

export default deleteClientSlice.reducer;