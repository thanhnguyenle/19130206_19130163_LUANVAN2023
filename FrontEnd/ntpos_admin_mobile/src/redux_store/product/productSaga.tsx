import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { editProductRequest, editProductSuccess, fetchProductFailure, fetchProductRequest, fetchProductsDetail, fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from "./productSlice";
import { gql } from "@apollo/client";
import { product } from "../../constants/graphql/apollo";
import { action } from "mobx";
const fetchProductsQuery = gql`
  query FetchProducts {
    products{
        id
        name
        description
        images{
        url
        }
        categories {
        name
        }
        quantity
        price
        status
    }
  }
`;
const fetchProductDetailQuery = gql`
  query FetchProducts($id:String) {
    product(id:$id){
    id
    name
    description
    price
    quantity
    unit
    images{
        url
    }
    categories{
        name
    }
    status
    }
  }
`;
const fetchEditProductQuery = gql`
    mutation FetchEditProduct(
            $id:String,
            $name:String,
            $description:String,
            $images:[String],
            $quantity:Int,
            $price:Float,
            $unit:String,
            $status:String
        ) {
        updateProduct (
            id:$id,
            productInput:{
            name:$name
            description:$description
            images:$images
            quantity: $quantity
            price: $price
            unit: $unit
            status:$status
        }){
            success
        }
    }
`;
function* fetchProductsSaga() {
    try {
        const { data } = yield call(product.query, {
            query: fetchProductsQuery,
        });
        yield put(fetchProductsSuccess(data.products));
    } catch (error: any) {
        yield put(fetchProductsFailure(error.message));
    }
}

export function* watchProductSaga() {
    yield takeLatest(fetchProductsStart.type, fetchProductsSaga);
}

function* fetchProductDetailSaga(action: ReturnType<typeof fetchProductRequest>) {
    try {
        const { data } = yield call(product.query, {
            query: fetchProductDetailQuery,
            variables: {
                id: action.payload,
            },
        });
        yield put(fetchProductsDetail(data.product));
    } catch (error: any) {
        yield put(fetchProductFailure(error.message));
    }
}

export function* detailProductSaga() {
    yield takeEvery(fetchProductRequest.type, fetchProductDetailSaga);
}
function* fetchEditProductSaga(action: any): Generator<any, any, any> {
    try {
        const { id, name, description, images, categories, quantity, price, unit, status } = action.payload;
        console.log(images);
        const { data } = yield call(product.mutate, {
            mutation: fetchEditProductQuery,
            variables: {
                id: id,
                name: name,
                description: description,
                images: images,
                quantity: quantity,
                price: price,
                unit: unit,
                status: status,
            }
        });
        console.log(data.updateProduct.success);
        yield put(editProductSuccess(data.updateProduct.success));
    } catch (error) {

    }
}
export function* editProductSaga() {
    yield takeEvery(editProductRequest.type, fetchEditProductSaga);
}