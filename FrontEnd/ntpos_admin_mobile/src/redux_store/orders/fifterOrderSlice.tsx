import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    time: string;
}

const initialState: FilterState = {
    time: '',
};

const filterOrderSlice = createSlice({
    name: 'filterOrder',
    initialState,
    reducers: {
        setTime: (state, action: PayloadAction<string>) => {
            state.time = action.payload;
        },
    },
});

export const { setTime } = filterOrderSlice.actions;

export default filterOrderSlice.reducer;
