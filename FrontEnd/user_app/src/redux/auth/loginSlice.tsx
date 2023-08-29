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
    resetPass: string | null;
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
    resetPass: null,
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
        requestReadUser: (state, action: PayloadAction<string>) => {
            state.loggedIn = true;
        },
        readUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        readFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordRequest: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.resetPass = action.payload;
            state.error = null;
        },
        resetPasswordFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    loginRequest, logOut,
    loginSuccess, loginFailure,
    requestReadUser,readUser,
    readFailure } = loginSlice.actions;
export default loginSlice.reducer;
