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
  deleteSuccess : boolean | null;
  editSuccess: boolean | null ;
  user : User ;

}
const userModel: User = {
  id: '1',
  username:'demo',
  name:'Minh',
  email:'demo',
  address:'edmo',
  avatar:'',
  groups:[],
  phoneNumber:'09',
  password:'',
  registeredAt:''
};
const initialState: UserState = {
  users: [],
  size: 0,
  loading: false,
  error: null,
  deleteSuccess : null,
  editSuccess: null,
  user : userModel,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    fetchUsersRequest: (state) => {
      console.log('Load clientScreen')
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      console.log(action.payload)
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
    deleteClientRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteClientSuccess: (state, action: PayloadAction<boolean>) => {
      state.deleteSuccess = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteClientFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteClientNull: (state) => {
      state.deleteSuccess = false;
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
    detailClientRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    detailClientSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    detailClientFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editClientRequest: (state, action: PayloadAction<{
      id:string,
      username:string,
      name:string,
      email:string,
      phoneNumber:string,
      address:string,
    }>) => {
      state.loading = true;
      state.error = null;
    },
    editClientSuccess: (state, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.editSuccess = action.payload;
    },
    editClientFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  editClientRequest,
  editClientSuccess,
  editClientFailure,
  detailClientRequest,
  detailClientSuccess,
  detailClientFailure,
  addClientRequest,
  addClientSuccess,
  addClientFailure,
  deleteClientNull,
  deleteClientRequest,
  deleteClientSuccess,
  deleteClientFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure
} = clientSlice.actions;

export default clientSlice.reducer;
