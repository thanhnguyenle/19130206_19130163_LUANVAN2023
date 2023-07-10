import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createProduct, createProductFailure, createProductSuccess, deleteProduct, deleteProductFailure, deleteProductSuccess, editProductFailure, editProductRequest, editProductSuccess, fetchProductFailure, fetchProductRequest, fetchProductsDetail, fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from "./productSlice";
import { gql } from "@apollo/client";
import { product } from "../../constants/graphql/apollo";
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
        console.log("Hello")
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
    } catch (error: any) {
        yield put(editProductFailure(error.message));
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
    } catch (error: any) {
        yield put(createProductFailure(error.message));
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
    } catch (error: any) {
        yield put(deleteProductFailure(error.message));
    }
}

export function* watchDeleteProduct() {
    yield takeEvery(deleteProduct.type, deleteProductSaga);
}