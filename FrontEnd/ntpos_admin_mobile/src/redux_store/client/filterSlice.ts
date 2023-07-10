import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FilterSearch {
    searchType: string;
    searchValue: string;
}
interface FilterState {
    time: string;
    searchType: string;
    searchValue: string;
};

const initialState: FilterState = {
    time: '',
    searchType: '',
    searchValue: '',
};

const filterSlice = createSlice({
    name: 'filterClient',
    initialState,
    reducers: {
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
        setSearch: (state, action: PayloadAction<FilterSearch>) => {
            const { searchType, searchValue } = action.payload
            console.log(action.payload);
            state.searchType = searchType;
            state.searchValue = searchValue;
        },
        setSearchType: (state, action: PayloadAction<string>) => {
            state.searchType = action.payload;
        },
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
    },
});

export const { setTime, setSearch, setSearchType, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
