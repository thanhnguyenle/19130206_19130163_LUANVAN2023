import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginResponse {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
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
interface AuthState {
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
const initialState: AuthState = {
    resetPass: false,
    loginResponse: null,
    loggedIn: false,
    loading: false,
    error: null,
    user: userModel,
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
        requestReadUser: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.loggedIn = true;
        },
        readUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        readFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { readFailure, loginRequest, logOut, loginSuccess, loginFailure, resetPassword, requestReadUser, readUser } = authSlice.actions;
export default authSlice.reducer;
