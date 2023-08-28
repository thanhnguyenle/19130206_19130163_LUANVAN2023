import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import { registerFailure, registerRequest, registerSuccess } from './registerSlice';
import { linkRegister } from '../../constants/LinkAPI';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { navigateToLogin } from '../navigation/navigationSlice';
import { Alert } from 'react-native'

interface RegisterCredentials {
    name: string;
    username: string;
    email: string;
    phoneNumber: string | null;
    address: string | null;
    password: string;
    avatar: 'https://i.imgur.com/ae2zhS0.png'
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

export function* watchRegister() {
    yield takeLatest(registerRequest.type, registerWorker);
}
