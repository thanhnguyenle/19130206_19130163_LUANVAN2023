import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListRolesState {
    roles: string[];
    loading: boolean;
    error: string | null;
}

const initialState: ListRolesState = {
    roles: [],
    loading: false,
    error: null,
};

const listRolesSlice = createSlice({
    name: 'listRoles',
    initialState,
    reducers: {
        fetchListRolesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchListRolesSuccess(state, action: PayloadAction<string[]>) {
            state.roles = action.payload;
            state.loading = false;
        },
        fetchListRolesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchListRolesRequest,
    fetchListRolesSuccess,
    fetchListRolesFailure,
} = listRolesSlice.actions;

export default listRolesSlice.reducer;