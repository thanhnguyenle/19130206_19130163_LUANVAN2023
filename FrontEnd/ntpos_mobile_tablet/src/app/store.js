import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import rootReducer from '../reducer/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
export const AppDispatch = store.dispatch;
export const RootState = store.getState;
export const AppThunk = () => {}; // Replace with your specific ThunkAction type definition
