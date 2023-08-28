import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createProduct, createProductFailure, createProductSuccess, deleteProduct, deleteProductFailure, deleteProductSuccess, editProductFailure, editProductRequest, editProductSuccess, fetchProductFailure, fetchProductRequest, fetchProductsDetail, fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from "./productSlice";
import { gql } from "@apollo/client";
import {product} from "../../assets/constants/graphql/apollo";
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
        id
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
    images{
        url
    }
    price
    quantity
    unit
    categories{
        name
    }
    status
    }
  }
`;
const fetchCreateProductQuery = gql`
    mutation FetchCreateProduct(
            $name:String,
            $description:String,
            $categories:[String],
            $images:[String],
            $quantity:Int,
            $price:Float,
            $unit:String,
            $status:String
        ) {
        createProduct (
            productInput:{
            name:$name
            description:$description
            images:$images
            quantity: $quantity
            price: $price
            unit: $unit
            status:$status
            categories:$categories
        }){
            success
        }
    }
`;
const fetchEditProductQuery = gql`
    mutation FetchEditProduct(
            $id:String,
            $name:String,
            $description:String,
            $categories:[String],
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
            categories:$categories
        }){
            success
        }
    }
`;
export const fetchDeleteProductQuery = gql`
  mutation($id: String){
  deleteProduct(id:$id){
  	success
  }
}

`;
function* fetchProductsSaga() {
    try {
        console.log('Hello')
        const { data } = yield call(product.query, {
            query: fetchProductsQuery,
        });
        yield put(fetchProductsSuccess(data.products));
    } catch (error) {
        yield put(fetchProductsFailure('Error'));
    }
}

export function* watchProductSaga() {
    yield takeEvery(fetchProductsStart.type, fetchProductsSaga);
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
    } catch (error) {
        yield put(fetchProductFailure('Error'));
    }
}

export function* detailProductSaga() {
    yield takeEvery(fetchProductRequest.type, fetchProductDetailSaga);
}
function* fetchEditProductSaga(action: any): Generator<any, any, any> {
    try {
        const { id, name, description, images, quantity, price, unit, status, categories, } = action.payload;
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
                categories: categories,
            }
        });
        console.log(data.updateProduct.success);
        yield put(editProductSuccess(data.updateProduct.success));
    } catch (error) {
        yield put(editProductFailure('Error'));
    }
}
export function* editProductSaga() {
    yield takeLatest(editProductRequest.type, fetchEditProductSaga);
}

function* createProductFun(action: any): Generator<any, any, any> {
    try {
        const { name, description, images, quantity, price, unit, status, categories, } = action.payload;
        const { data } = yield call(product.mutate, {
            mutation: fetchCreateProductQuery,
            variables: {
                name: name,
                description: description,
                images: images,
                quantity: quantity,
                price: price,
                unit: unit,
                status: status,
                categories: categories,
            }
        });
        yield put(createProductSuccess(data.createProduct.success));
    } catch (error) {
        yield put(createProductFailure('Error'));
    }
}

export function* watchCreateProduct() {
    yield takeLatest(createProduct.type, createProductFun);
}
function* deleteProductSaga(action: any): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const { data } = yield call(product.mutate, {
            mutation: fetchDeleteProductQuery,
            variables: {
                id: action.payload,
            },
        });
        yield put(deleteProductSuccess(data.deleteProduct.success));
    } catch (error) {
        yield put(deleteProductFailure('Error'));
    }
}

export function* watchDeleteProduct() {
    yield takeEvery(deleteProduct.type, deleteProductSaga);
}
