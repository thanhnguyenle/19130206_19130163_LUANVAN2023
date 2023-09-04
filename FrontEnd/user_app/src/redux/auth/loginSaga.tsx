import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import {
    loginRequest,
    loginSuccess,
    loginFailure,
    requestReadUser,
    readFailure,
    readUser,
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure
} from './loginSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigateToUser } from '../navigation/navigationSlice';
import { Alert } from 'react-native'
import {linkLogin, linkMe, resetPassword, XacThucNguoiDung} from '../../constants/link';
import {accuracyFailure, accuracySuccess} from "./registerSlice";

interface LoginCredentials {
    email: string;
    password: string;
}
interface LoginResponse {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiration: number;
    refreshTokenExpiration: number;
}
export const authenticateUser = async (credentials: LoginCredentials) => {
    try {
        const response = await axios.post(linkLogin, JSON.stringify(credentials), {
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
export const reactUserMe = async (accessToken: string) => {
    try {
        const response = await axios.get(linkMe, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error: any) {
        throw new Error('error');
    }
};



function* loginWorker(action: PayloadAction<LoginCredentials>): Generator<any, any, any> {
    try {
        yield call(AsyncStorage.removeItem, 'accessToken');
        yield call(AsyncStorage.removeItem, 'refreshToken');
        const response = yield call(authenticateUser, action.payload);
        if (response != null) {
            yield put(loginSuccess(response));
            yield call(AsyncStorage.setItem, 'accessToken', response.accessToken);
            yield call(AsyncStorage.setItem, 'refreshToken', response.refreshToken);
            yield delay(500)
            yield put(navigateToUser());
        }
        else {
            Alert.alert('Lỗi', 'Vui lòng nhập chính xác email và mật khẩu');
            yield put(loginFailure('Invalid credentials')); // set a generic error message
        }

    } catch (error: any) {
        Alert.alert('Lỗi', 'Vui lòng nhập chính xác email và mật khẩu');
        yield put(loginFailure(error.message)); // Set error state
    }
}

export function* watchLogin() {
    yield takeLatest(loginRequest.type, loginWorker);
}
function* reactMeWorker(action: PayloadAction<string>): Generator<any, any, any> {
    try {
        const response = yield call(reactUserMe, action.payload);
        if (response != null) {
            yield put(readUser(response));
        }
        else {
            yield put(readFailure('Invalid credentials')); // set a generic error message
        }
    } catch (error: any) {
        yield put(readFailure(error.message)); // Set error state
    }
}
export const restPassword = async (id: string) => {
    try {
        const response = await axios.post(resetPassword, JSON.stringify(id), {
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
function*  restPasswordWorker (action: PayloadAction<string>): Generator<any, any, any> {
    try {
        console.log(action.payload)
        const response = yield call(restPassword, action.payload);
        if (response != null) {
            Alert.alert('Success', 'Vui lòng thay đổi qua hộp thư email của bạn!');
            yield put(resetPasswordSuccess(response));
        }
        else {
            Alert.alert('Lỗi', 'Thay đổi mật khẩu thất bại!');
        }
    } catch (error: any) {
        yield put(resetPasswordFailure(error.message)); // Set error state
    }
}
export function* watchReadUser() {
    yield takeLatest(requestReadUser.type, reactMeWorker);
    yield takeLatest(resetPasswordRequest.type, restPasswordWorker);
}

