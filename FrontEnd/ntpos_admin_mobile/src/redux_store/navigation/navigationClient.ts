import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentScreenClient: 'Client',
};

const navigationClientSlice = createSlice({
    name: 'navigationClient',
    initialState,
    reducers: {
        navigateToClient: (state) => {
            state.currentScreenClient = 'Client';
        },
        navigateToNotificationStack: (state) => {
            state.currentScreenClient = 'NotificationStack';
        },
        navigateToSearchClient: (state) => {
            state.currentScreenClient = 'SearchClient';
        },
        navigateToDetailClient: (state) => {
            state.currentScreenClient = 'DetailClient';
        },
        navigateToAddClient: (state) => {
            state.currentScreenClient = 'AddClient';
        },
        navigateToSelectGroup: (state) => {
            state.currentScreenClient = 'SelectGroup';
        },
        navigateToAddGroup: (state) => {
            state.currentScreenClient = 'AddGroup';
        },
        navigateToSelectRole: (state) => {
            state.currentScreenClient = 'SelectRole';
        },
    },
});

export const { navigateToSelectRole, navigateToAddGroup, navigateToSelectGroup,
    navigateToAddClient, navigateToDetailClient, navigateToSearchClient, navigateToNotificationStack, navigateToClient
} = navigationClientSlice.actions;
export default navigationClientSlice.reducer;
