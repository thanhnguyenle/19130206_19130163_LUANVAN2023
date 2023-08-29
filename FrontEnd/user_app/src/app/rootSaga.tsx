import { all } from 'redux-saga/effects';
import {watchLogin, watchReadUser} from '../redux/auth/loginSaga';
import {createOrderSaga, ordersSaga} from '../redux/order/orderSaga';
import {watchCategorySaga} from "../redux/product/category/CategorySaga";
import {detailProductSaga, watchProductsSaga} from "../redux/product/product1/ProductSaga";
import {groupTableSaga} from "../redux/table/groupTableSaga";
import {watchRegister} from "../redux/auth/registerSaga";
import {createReceiptOrderSaga} from "../redux/payment/PaymentSaga";
export default function* rootSaga() {
    yield all([
        watchLogin(),
        ordersSaga(),
        watchRegister(),
        watchCategorySaga(),
        watchProductsSaga(),
        groupTableSaga(),
        detailProductSaga(),
        watchReadUser(),
        ////////////
        createReceiptOrderSaga(),
        createOrderSaga(),
    ]);
}
