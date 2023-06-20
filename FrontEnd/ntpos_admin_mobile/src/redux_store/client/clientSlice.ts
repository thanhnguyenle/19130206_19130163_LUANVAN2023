import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/user";

export interface PropsUser {
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  groups: string[],
}
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
    addClientRequest: (state, action: PayloadAction<PropsUser>) => {
      state.loading = true;
      state.error = null;
    },
    addClientSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    addClientFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addClientRequest, addClientSuccess, addClientFailure, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } = clientSlice.actions;

export default clientSlice.reducer;