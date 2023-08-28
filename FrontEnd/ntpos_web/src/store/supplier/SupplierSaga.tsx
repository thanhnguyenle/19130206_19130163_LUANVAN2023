import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchSuppliersFailure, fetchSuppliersRequest, fetchSuppliersSuccess} from './SupplierSlice';
import {gql} from "@apollo/client";
import { inventory1} from "../../assets/constants/graphql/apollo";
export const fetchSuppliersQuery = gql`
  query FetchSuppliers {
   suppliers{
       supplierOutputs{
          id
          name
          address
          phone
          email
          website
          status
          description
        }
    }
  }
`;
function* fetchSuppliersSaga() {
    try {
        const { data } = yield call(inventory1.query, {
            query: fetchSuppliersQuery, // Truy vấn GraphQL của bạn
        });
        yield put(fetchSuppliersSuccess(data.suppliers.supplierOutputs));
    } catch (error) {
        yield put(fetchSuppliersFailure('Error'));
    }
}
// Watchers
export function* supplierSaga() {
    yield takeLatest(fetchSuppliersRequest.type, fetchSuppliersSaga);
}
