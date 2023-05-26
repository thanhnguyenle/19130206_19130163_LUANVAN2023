import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface UserState {
  users: User[];
  size: number;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  size: 0,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
      state.size = action.payload.length;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.users = [];
    },
  },
});

export const { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = clientSlice.actions;

export default clientSlice.reducer;
