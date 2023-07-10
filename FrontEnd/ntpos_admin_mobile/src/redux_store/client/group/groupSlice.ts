import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../../models/group';

export interface GroupUser {
    name: string;
    description: string;
    roles: string[];
}

interface GroupState {
    groups: Group[];
    selectedGroups: Group[];
    loading: boolean;
    error: string | null;
}

const initialState: GroupState = {
    groups: [],
    selectedGroups: [],
    loading: false,
    error: null,
};

const groupSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        addRequsetGroup: (state, action: PayloadAction<GroupUser>) => {
        },
        addGroup: (state, action: PayloadAction<Group>) => {
            state.groups.push(action.payload);
        },
        fetchListGroup: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
            state.loading = false;
            state.error = null;
        },
        requestList: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchGroupsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.groups = [];
        },
        dispatchGroupsNull(state) {
            state.selectedGroups = [];
        },
        selectGroups: (state, action: PayloadAction<Group>) => {
            const selectedGroupUser = action.payload;
            const isGroupSelected = state.selectedGroups.some(
                (groupUser) => groupUser.name === selectedGroupUser.name
            );
            if (!isGroupSelected) {
                state.selectedGroups.push(selectedGroupUser);
                console.log(state.selectedGroups)
            }
        },
        deselectGroup: (state, action: PayloadAction<GroupUser>) => {
            const deselectedGroup = action.payload;
            state.selectedGroups = state.selectedGroups.filter((groupUser) => groupUser.name !== deselectedGroup.name);
            console.log(state.selectedGroups)
        },
    },
});

export const { addRequsetGroup, addGroup, fetchListGroup, requestList, fetchGroupsFailure, dispatchGroupsNull, selectGroups, deselectGroup } = groupSlice.actions;

export default groupSlice.reducer;
