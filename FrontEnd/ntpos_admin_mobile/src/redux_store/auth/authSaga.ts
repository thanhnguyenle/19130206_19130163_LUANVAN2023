import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure, readUser, readFailure, requestReadUser } from './authSlice';
import { linkLogin, linkMe } from '../../constants/LinkAPI';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigateToAdmin } from '../navigation/navigationSlice';
import { Alert } from 'react-native'

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
            yield put(navigateToAdmin());
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
export function* watchLogin() {
    yield takeLatest(loginRequest.type, loginWorker);
}
export function* watchReadUser() {
    yield takeLatest(requestReadUser.type, reactMeWorker);
}
