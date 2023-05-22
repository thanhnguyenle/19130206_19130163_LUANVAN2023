import {all} from 'redux-saga/effects';
import {watchLogin} from '../redux/auth/loginSaga';

export default function* rootSaga() {
  yield all([watchLogin()]);
}
