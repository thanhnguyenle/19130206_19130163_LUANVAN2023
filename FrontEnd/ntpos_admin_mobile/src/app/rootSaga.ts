import { all } from 'redux-saga/effects';
import { watchLogin, watchReadUser } from '../redux_store/auth/authSaga';
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
import {
    createEditTableOrderSaga,
    createOrderSaga, detailOrderSaga,
    ordersSaga,
    watchDeleteOrder
} from "../redux_store/orders/ordersSaga";
import {
    emptyTablesSaga,
    tableLengthSaga,
    tableSaga,
    watchCreateTable,
    watchDeleteTable
} from "../redux_store/table/tableSaga";
import { groupTableSaga, watchCreateGroupTable, watchDeleteGroupTable } from '../redux_store/table/groupTableSaga';
import {
    createOrderReturnSaga, createPaySlipOrderSaga, detailOrderReturnSaga,
    detailPaySlipOrderSaga,
    orderReturnSaga, OrderReturnsSaga, watchDeleteOrderReturn, watchDeletePaySlipOrder
} from "../redux_store/order_return/OrderReturnSaga";
import {
    createReceiptOrderSaga,
    detailReceiptOrderSaga,
    receiptOrdersSaga,
    watchDeleteReceiptOrder
} from "../redux_store/payment/PaymentSaga";
import {
    createInventorySaga,
    detailDetailInventorySaga,
    listInventorySaga, listMaterialReturnSaga, listSupplierSaga,
    watchDeleteInventory
} from "../redux_store/inventory/InventorySaga";

export default function* rootSaga() {
    yield all([
        watchReadUser(),
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
        watchDeleteOrder(),
        // end order //
        tableSaga(),
        groupTableSaga(),
        watchCreateTable(),
        watchCreateGroupTable(),
        watchDeleteTable(),
        watchDeleteGroupTable(),
        createOrderSaga(),
        createEditTableOrderSaga(),
        // orderReturn
        orderReturnSaga(),
        detailPaySlipOrderSaga(),
        detailOrderSaga(),
        createReceiptOrderSaga(),
        receiptOrdersSaga(),
        watchDeleteReceiptOrder(),
        detailReceiptOrderSaga(),
        createOrderReturnSaga(),
        OrderReturnsSaga(),
        watchDeletePaySlipOrder(),
        watchDeleteOrderReturn(),
        createPaySlipOrderSaga(),
        detailOrderReturnSaga(),
        listInventorySaga(),
        detailDetailInventorySaga(),
        watchDeleteInventory(),
        createInventorySaga(),
        listMaterialReturnSaga(),
        listSupplierSaga(),
        tableLengthSaga(),
        emptyTablesSaga(),
        // end OrderReturn
    ]);
}
