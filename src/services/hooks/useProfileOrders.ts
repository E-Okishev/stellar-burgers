import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { getOrdersApi } from '@api';
import {
  clearProfileOrders,
  setOrderFetchLoadings,
  setProfileOrders
} from '../store/slices/orders-slice';

export const useProfileOrders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOrderFetchLoadings());
    getOrdersApi().then((res) => dispatch(setProfileOrders(res)));

    return () => {
      dispatch(clearProfileOrders());
    };
  }, []);
};
