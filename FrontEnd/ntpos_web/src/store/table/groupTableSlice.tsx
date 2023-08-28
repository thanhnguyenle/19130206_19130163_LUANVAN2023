// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { GroupTable } from '../../models/groupTable';
// import { Table } from '../../models/table';
//
//
// interface GroupTableState {
//     data: GroupTable[];
//     loading: boolean;
//     error: string | null;
//     selectedTables: Table[];
//     isCreateGroupTable: boolean | null;
//     isDeleteSucess: boolean | null;
// }
//
// const initialState: GroupTableState = {
//     data: [],
//     loading: false,
//     error: null,
//     selectedTables: [],
//     isCreateGroupTable: null,
//     isDeleteSucess: null,
// };
//
// const groupTableSlice = createSlice({
//     name: 'groupTables',
//     initialState,
//     reducers: {
//         fetchGroupTablesStart(state) {
//             state.loading = true;
//             state.error = null;
//         },
//         setData(state, action: PayloadAction<GroupTable[]>) {
//             state.data = action.payload;
//             state.loading = false;
//         },
//
//         setError(state, action: PayloadAction<string | null>) {
//             state.error = action.payload;
//             state.loading = false;
//         },
//         dispatchTablesNull(state) {
//             state.selectedTables = [];
//         },
//         createGroupTable: (state,
//             action: PayloadAction<{
//                 name: string,
//                 note: string,
//                 status: string,
//                 tables: string[],
//             }>
//         ) => {
//             state.loading = true;
//             state.error = '';
//         },
//         createGroupTableSuccess: (state, action: PayloadAction<boolean>) => {
//             state.loading = false;
//             state.isCreateGroupTable = action.payload;
//             state.error = null;
//         },
//         createGroupTableFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         selectTables: (state, action: PayloadAction<Table>) => {
//             const selectedGroupTable = action.payload;
//             const isGroupSelected = state.selectedTables.some(
//                 (groupTable) => groupTable.id === selectedGroupTable.id
//             );
//             if (!isGroupSelected) {
//                 state.selectedTables.push(selectedGroupTable);
//             }
//         },
//         deselectTable: (state, action: PayloadAction<Table>) => {
//             const deselectedGroupTables = action.payload;
//             state.selectedTables = state.selectedTables.filter((groupTable) => groupTable.id !== deselectedGroupTables.id);
//         },
//         deleteGroupTable: (state, action: PayloadAction<string>) => {
//             state.loading = true;
//             state.error = '';
//         },
//         deleteGroupTableSuccess: (state, action: PayloadAction<boolean>) => {
//             state.isDeleteSucess = action.payload;
//             state.loading = false;
//             state.error = null;
//         },
//         deleteGroupTableFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         deleteGroupTableNull: (state) => {
//             state.isDeleteSucess = false;
//         },
//
//     },
// });
//
// export const {
//     deleteGroupTableFailure,
//     deleteGroupTableNull,
//     deselectTable,
//     deleteGroupTableSuccess,
//     dispatchTablesNull,
//     selectTables,
//     deleteGroupTable,
//     fetchGroupTablesStart,
//     setData,
//     setError,
//     createGroupTable,
//     createGroupTableSuccess,
//     createGroupTableFailure, } = groupTableSlice.actions;
//
// export default groupTableSlice.reducer;
