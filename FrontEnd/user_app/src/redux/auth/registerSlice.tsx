import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
    loading: boolean;
    id: string | null;
    error: string | null;
}
const initialState: RegisterState = {
    loading: false,
    id: null,
    error: null,
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
    },
});

export const { registerRequest, registerSuccess, registerFailure } = registerSlice.actions;

export default registerSlice.reducer;
