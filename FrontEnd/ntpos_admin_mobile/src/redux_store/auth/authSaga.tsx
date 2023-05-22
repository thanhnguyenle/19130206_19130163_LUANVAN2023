import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFailure } from './authSlice';
import { linkLogin } from '../../constants/LinkAPI';
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


function* loginWorker(action: PayloadAction<LoginCredentials>): Generator<any, any, any> {
    try {
        const response = yield call(authenticateUser, action.payload);
        console.log(response);
        if (response != null) {
            console.log(3);
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

export function* watchLogin() {
    yield takeLatest(loginRequest.type, loginWorker);
}
