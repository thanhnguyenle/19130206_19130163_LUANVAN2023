import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginResponse {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
}
interface AuthState {
    loginResponse: LoginResponse | null;
    loggedIn: boolean,
    loading: boolean;
    resetPass: boolean;
    error: string | null;
}
interface LoginCredentials {
    email: string;
    password: string;
}
const initialState: AuthState = {
    resetPass: false,
    loginResponse: null,
    loggedIn: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action: PayloadAction<LoginCredentials>) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<LoginResponse>) => {
            state.loginResponse = action.payload;
            state.loggedIn = true;
            state.loading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loggedIn = false;
            state.loading = false;
            state.error = action.payload;
        },
        logOut: (state) => {
            state.loginResponse = null;
            state.loggedIn = false;
            state.loading = false;
        },
        resetPassword: (state, action: PayloadAction<boolean>) => {
            state.resetPass = action.payload;
        },
    },
});

export const { loginRequest, logOut, loginSuccess, loginFailure, resetPassword, } = authSlice.actions;
export default authSlice.reducer;