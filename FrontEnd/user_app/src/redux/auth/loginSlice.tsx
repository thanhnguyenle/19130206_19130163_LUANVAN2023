import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from "../../model/user";

interface LoginResponse {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
}
interface LoginState {
    loginResponse: LoginResponse | null;
    loggedIn: boolean,
    loading: boolean;
    resetPass: boolean;
    error: string | null;
    user: User;
}
interface LoginCredentials {
    email: string;
    password: string;
}
const userModel: User = {
    id: '',
    name: "",
    address: '',
    avatar: '',
    email: '',
    groups: [],
    password: '',
    phoneNumber: '',
    registeredAt: '',
    username: '',
};
const initialState: LoginState = {
    resetPass: false,
    loginResponse: null,
    loggedIn: false,
    loading: false,
    error: null,
    user: userModel,
};

const loginSlice = createSlice({
    name: 'login',
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

export const { loginRequest, logOut, loginSuccess, loginFailure, resetPassword, } = loginSlice.actions;
export default loginSlice.reducer;
