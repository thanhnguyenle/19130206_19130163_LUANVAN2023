import { all } from 'redux-saga/effects';
import { watchLogin } from '../redux/auth/loginSaga';
import { ordersSaga } from '../redux/order/orderSaga';
export default function* rootSaga() {
    yield all([
        watchLogin(),
        ordersSaga(),
    ]);
}
