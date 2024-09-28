import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import {
  clearProfileOrders,
  setOrderFetchLoadings
} from '../store/slices/orders-slice';
import { fetchOrders } from '../store/actions/orders-actions';

export const useProfileOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOrderFetchLoadings());
    dispatch(fetchOrders());

    return () => {
      dispatch(clearProfileOrders());
    };
  }, []);
};
