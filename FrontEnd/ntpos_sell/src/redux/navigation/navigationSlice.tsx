import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentScreen: 'Splash',
};

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        navigateToRegister: (state) => {
            state.currentScreen = 'Register';
        },
        navigateToUser: (state) => {
            state.currentScreen = 'SellApp';
        },
        navigateToLogin: (state) => {
            state.currentScreen = 'Login';
        },
        navigateToResetPassword: (state) => {
            state.currentScreen = 'ResetPassword';
        },
    },
});

export const { navigateToRegister, navigateToUser, navigateToLogin, navigateToResetPassword } = navigationSlice.actions;
export default navigationSlice.reducer;
