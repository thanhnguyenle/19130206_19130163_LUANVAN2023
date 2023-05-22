import {createSlice} from '@reduxjs/toolkit';

interface LoginResponse {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiration: number;
  refreshTokenExpiration: number;
}

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loginResponse: null,
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loginResponse = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loginResponse = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {loginRequest, loginSuccess, loginFailure} = loginSlice.actions;
export default loginSlice.reducer;
