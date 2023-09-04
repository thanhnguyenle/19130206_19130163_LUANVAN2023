import {call, put, all, takeLatest, delay, takeEvery} from 'redux-saga/effects';
import {
    accuracyFailure,
    accuracyRequest,
    accuracySuccess,
    registerFailure,
    registerRequest,
    registerSuccess
} from './registerSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { navigateToLogin } from '../navigation/navigationSlice';
import { Alert } from 'react-native'
import {linkRegister, XacThucNguoiDung} from '../../constants/link';

interface RegisterCredentials {
    name: string;
    username: string;
    email: string;
    phoneNumber: string ;
    address: string ;
    password: string;
    avatar: string
}
export const registerUser = async (credentials: RegisterCredentials) => {
    try {
        const response = await axios.post(linkRegister, JSON.stringify(credentials), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        throw new Error('error');
    }
};
function* registerWorker(action: PayloadAction<RegisterCredentials>): Generator<any, any, any> {
    try {
        console.log(action.payload);
        const response = yield call(registerUser, action.payload);
        if (response != null) {
            yield put(registerSuccess(response));
            yield delay(500)
            yield put(navigateToLogin());
        }
        else {
            Alert.alert('Lỗi', 'Thông tin của bạn đã tồn tại!');
            yield put(registerFailure('Invalid credentials')); // set a generic error message
        }
    } catch (error: any) {
        Alert.alert('Lỗi', 'Thông tin của bạn đã tồn tại!');
        yield put(registerFailure(error.message)); // Set error state
    }
}



export const accuracyUser = async (id: string) => {
    try {
        const response = await axios.post(XacThucNguoiDung, JSON.stringify(id), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        throw new Error('error');
    }
};
function*  accuracyWorker(action: PayloadAction<string>): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const response = yield call(accuracyUser, action.payload);
        if (response != null) {
            Alert.alert('Success', 'Vui lòng xác thực qua hộp thư email của bạn!');
            yield put(accuracySuccess(response));
        }
        else {
            Alert.alert('Lỗi', 'Xác thực thông tin thất bại!');
        }
    } catch (error: any) {
        yield put(accuracyFailure(error.message)); // Set error state
    }
}
export function* watchRegister() {
    yield takeEvery(registerRequest.type, registerWorker);
    yield takeEvery(accuracyRequest.type, accuracyWorker);
}
