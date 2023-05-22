import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    time: string;
}

const initialState: FilterState = {
    time: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
    },
});

export const { setTime } = filterSlice.actions;

export default filterSlice.reducer;
