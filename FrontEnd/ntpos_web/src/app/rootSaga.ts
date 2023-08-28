import { all } from 'redux-saga/effects';
import {
    addClientSaga,
    detailClientSaga,
    editClientSaga,
    usersSaga,
    watchDeleteClient
} from '../store/client/clientSaga';
import {addgroupSaga, listGroupsSaga} from "../store/client/group/groupSaga";
import {ordersSaga, watchDeleteOrder} from "../store/order/orderSaga";
import {watchProductSaga} from "../store/product/productSaga";
import {supplierSaga} from "../store/supplier/SupplierSaga";
import {tableSaga} from "../store/table/tableSaga";

export default function* rootSaga() {
    yield all([
        usersSaga(),
        watchDeleteClient(),
        addClientSaga(),
        listGroupsSaga(),
        detailClientSaga(),
        editClientSaga(),
        //
        watchDeleteOrder(),
        ordersSaga(),
        //
        watchProductSaga(),
        ///
        supplierSaga(),
        tableSaga(),
    ]);
}
