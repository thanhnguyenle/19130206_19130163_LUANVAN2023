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
        navigateToAdmin: (state) => {
            state.currentScreen = 'Admin';
        },
        navigateToLogin: (state) => {
            state.currentScreen = 'Login';
        },
        navigateToResetPassword: (state) => {
            state.currentScreen = 'ResetPassword';
        },
    },
});

export const { navigateToRegister, navigateToAdmin, navigateToLogin, navigateToResetPassword } = navigationSlice.actions;
export default navigationSlice.reducer;
