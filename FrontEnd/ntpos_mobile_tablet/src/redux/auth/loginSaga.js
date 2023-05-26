import {call, put, takeEvery} from 'redux-saga/effects';
import {loginRequest, loginSuccess, loginFailure} from './loginSlice';
import {loginAPI} from 'api/loginAPI';
import Axios from 'axios';
import {linkLogin} from '../../constants/link';

export const authenticateUser = async credentials => {
  try {
    console.log(linkLogin);
    console.log(credentials);
    const response = await Axios.post(linkLogin, JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json',
        Accept: '/',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error('error');
  }
};

function* loginSaga(action) {
  try {
    console.log(action.payload);
    const {username, password} = action.payload;
    const user = yield call(loginAPI, username, password);
    yield put(loginSuccess(user));
  } catch (error) {
    console.log(error);
    yield put(loginFailure(error.message));
  }
}
// interface LoginCredentials {
//   email: string;
//   password: string;
// }
export function* watchLogin() {
  yield takeEvery(loginRequest.type, loginSaga);
}
