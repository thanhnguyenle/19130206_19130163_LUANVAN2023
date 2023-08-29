import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
    loading: boolean;
    id: string | null;
    error: string | null;
    accuracy: string | null;
}
const initialState: RegisterState = {
    loading: false,
    id: null,
    error: null,
    accuracy: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerRequest: (state, action: PayloadAction<{
            name: string;
            username: string;
            email: string;
            phoneNumber: string;
            address: string;
            password: string;
            avatar: string
        }>) => {
            console.log(action.payload)
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.id = action.payload;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        accuracyRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        accuracySuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.accuracy = action.payload;
            state.error = null;
        },
        accuracyFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    accuracySuccess,
    accuracyRequest,
    accuracyFailure,
    registerRequest, registerSuccess, registerFailure } = registerSlice.actions;

export default registerSlice.reducer;
