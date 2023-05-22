import { all } from 'redux-saga/effects';
import { watchLogin } from '../redux_store/auth/authSaga';
import { watchRegister } from '../redux_store/auth/registerSaga';
import { usersSaga } from '../redux_store/client/clientSaga';
import { filterSaga } from '../redux_store/client/filterSaga';
import { detailClientSaga } from '../redux_store/client/detailClientSaga';
import { watchDeleteClient } from '../redux_store/client/deleteClientSaga';
import { listRolesSaga } from '../redux_store/client/listRoleSaga';

export default function* rootSaga() {
    yield all([
        watchLogin(),
        watchRegister(),
        // client
        usersSaga(),
        filterSaga(),
        detailClientSaga(),
        watchDeleteClient(),
        listRolesSaga(),
        // end client
    ]);
}
