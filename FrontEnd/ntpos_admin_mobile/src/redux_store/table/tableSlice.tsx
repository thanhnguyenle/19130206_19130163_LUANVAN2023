import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Table } from '../../models/table';
import { GroupTable } from '../../models/groupTable';


interface TableState {
    data: Table[];
    dataTableNone: Table[];
    loading: boolean;
    error: string | null;
    selectedGroupTables: GroupTable[];
    isCreateTable: boolean | null;
    isDeleteSucess: null | boolean;
    numbersLengthTabled: number,
}

const initialState: TableState = {
    data: [],
    dataTableNone: [],
    loading: false,
    error: null,
    selectedGroupTables: [],
    isCreateTable: null,
    isDeleteSucess: null,
    numbersLengthTabled:0,
};

const tableSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        fetchTablesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTablesNull(state) {
            state.data = [];
            state.loading = true;
            state.error = null;
        },
        setData(state, action: PayloadAction<Table[]>) {
            state.data = action.payload;
            state.loading = false;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        },
        createTable: (state,
            action: PayloadAction<{
                name: string,
                numberOfPeople: number,
                note: string,
                status: string,
                groups: string[],
            }>
        ) => {
            state.loading = true;
            state.error = '';
        },
        createTableSuccess: (state, action: PayloadAction<boolean>) => {
            state.loading = false;
            state.isCreateTable = action.payload;
            state.error = null;
        },
        createTableFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        dispatchGroupsNull(state) {
            state.selectedGroupTables = [];
        },
        selectGroupTables: (state, action: PayloadAction<GroupTable>) => {
            const selectedGroupTable = action.payload;
            const isGroupSelected = state.selectedGroupTables.some(
                (groupTable) => groupTable.id === selectedGroupTable.id
            );
            if (!isGroupSelected) {
                state.selectedGroupTables.push(selectedGroupTable);
            }
        },
        deselectGroupTable: (state, action: PayloadAction<GroupTable>) => {
            const deselectedGroupTables = action.payload;
            state.selectedGroupTables = state.selectedGroupTables.filter((groupTable) => groupTable.id !== deselectedGroupTables.id);
        },
        deleteTable: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = '';
        },
        deleteTableSuccess: (state, action: PayloadAction<boolean>) => {
            state.isDeleteSucess = action.payload;
            state.loading = false;
            state.error = null;
        },
        deleteTableFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteTableNull: (state) => {
            state.isDeleteSucess = false;
        },
        numberLengthTabled: (state) => {
            state.loading = true;
            state.error = '';
        },
        numberLengthTabledSuccess: (state, action: PayloadAction<number>) => {
            state.numbersLengthTabled = action.payload;
            state.loading = false;
            state.error = null;
        },
        numberLengthTabledFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchTablesNone1(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTablesNoneFailure(state,action) {
            state.loading = false;
            state.error = action.payload;
        },
        setDataTablesNone(state, action: PayloadAction<Table[]>) {
            state.dataTableNone = action.payload;
            state.loading = false;
        },

    },

});

export const {
    fetchTablesNoneFailure,
  setDataTablesNone,
  fetchTablesNone1,
    numberLengthTabled,
  numberLengthTabledSuccess,
  numberLengthTabledFailure,
    deleteTable,
    deleteTableSuccess,
    deleteTableFailure,
    deleteTableNull,
    fetchTablesStart,
    fetchTablesNull,
    dispatchGroupsNull,
    setData, setError,
    selectGroupTables,
    deselectGroupTable,
    createTable,
    createTableSuccess,
    createTableFailure,
} = tableSlice.actions;

export default tableSlice.reducer;
