import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';

interface DetailClientState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: DetailClientState = {
    user: null,
    loading: false,
    error: null,
};

const detailClientSlice = createSlice({
    name: 'detailClient',
    initialState,
    reducers: {
        fetchClientRequest: (state, action: PayloadAction<String>) => {
            state.loading = true;
            state.error = null;
        },
        fetchClientSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchClientFailure: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchClientRequest, fetchClientSuccess, fetchClientFailure } = detailClientSlice.actions;

export default detailClientSlice.reducer;