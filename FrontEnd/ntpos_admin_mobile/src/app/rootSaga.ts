import { all } from 'redux-saga/effects';
import { watchLogin } from '../redux_store/auth/authSaga';
import { watchRegister } from '../redux_store/auth/registerSaga';
import { addClientSaga, usersSaga } from '../redux_store/client/clientSaga';
import { filterSaga, filterSearchSaga } from '../redux_store/client/filterSaga';
import { detailClientSaga } from '../redux_store/client/detailClientSaga';
import { watchDeleteClient } from '../redux_store/client/deleteClientSaga';
import { listRolesSaga } from '../redux_store/client/listRoleSaga';
import { addgroupSaga, listGroupsSaga } from '../redux_store/client/group/groupSaga';
import { detailProductSaga, editProductSaga, watchCreateProduct, watchDeleteProduct, watchProductSaga } from '../redux_store/product/productSaga';
import { watchCategorySaga } from '../redux_store/product/categorySaga';
import { filterProductsSaga } from '../redux_store/product/fifterProductSaga';
import { ordersSaga } from '../redux_store/orders/ordersSaga';

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegister(),
        //start client//
        usersSaga(),
        filterSaga(),
        filterSearchSaga(),
        detailClientSaga(),
        watchDeleteClient(),
        listRolesSaga(),
        addgroupSaga(),
        listGroupsSaga(),
        addClientSaga(),
        // end client //
        // start product//
        watchProductSaga(),
        detailProductSaga(),
        editProductSaga(),
        watchCategorySaga(),
        watchCreateProduct(),
        filterProductsSaga(),
        watchDeleteProduct(),
        // end product//
        // start order //
        ordersSaga(),
        // end order //
    ]);
}
