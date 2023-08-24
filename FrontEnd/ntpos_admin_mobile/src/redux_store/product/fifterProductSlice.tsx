import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    time: string;
};

const initialState: FilterState = {
    time: '',
};

const filterProductSlice = createSlice({
    name: 'filterProduct',
    initialState,
    reducers: {
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
    },
});

export const { setTime } = filterProductSlice.actions;

export default filterProductSlice.reducer;
