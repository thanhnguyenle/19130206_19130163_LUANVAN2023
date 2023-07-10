import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Role {
    typename: string;
    roleName: string;
}
interface ListRolesState {
    roles: Role[];
    loading: boolean;
    error: string | null;
    selectedRoles: Role[];
}

const initialState: ListRolesState = {
    roles: [],
    loading: false,
    error: null,
    selectedRoles: [],
};

const listRolesSlice = createSlice({
    name: 'listRolesClient',
    initialState,
    reducers: {
        fetchListRolesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchListRolesSuccess(state, action: PayloadAction<Role[]>) {
            state.roles = action.payload;
            state.loading = false;
        },
        fetchListRolesFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        dispatchRolesNull(state) {
            state.selectedRoles = []
        },
        selectRole: (state, action: PayloadAction<Role>) => {
            const selectedRole = action.payload;
            const isRoleSelected = state.selectedRoles.some(
                (role) => role.roleName === selectedRole.roleName
            );
            if (!isRoleSelected) {
                state.selectedRoles.push(selectedRole);
                console.log(state.selectedRoles)
            }
        },
        deselectRole: (state, action: PayloadAction<Role>) => {
            const deselectedRole = action.payload;
            state.selectedRoles = state.selectedRoles.filter((role) => role.roleName !== deselectedRole.roleName);
            console.log(state.selectedRoles)
        },
    },
});

export const {
    fetchListRolesRequest,
    fetchListRolesSuccess,
    fetchListRolesFailure,
    selectRole,
    deselectRole,
    dispatchRolesNull
} = listRolesSlice.actions;

export default listRolesSlice.reducer;