import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
