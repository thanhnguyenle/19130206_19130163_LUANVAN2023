import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeleteClientState {
    loading: boolean;
    error: string | null;
}

const initialState: DeleteClientState = {
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
        deleteClientSuccess: (state) => {
            state.loading = false;
            state.error = null;
        },
        deleteClientFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    deleteClientRequest,
    deleteClientSuccess,
    deleteClientFailure,
} = deleteClientSlice.actions;

export default deleteClientSlice.reducer;