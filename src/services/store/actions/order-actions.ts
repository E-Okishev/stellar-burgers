import { getOrderByNumberApi, orderBurgerApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addOrder = createAsyncThunk(
  'order/addOrder',
  async function (data: string[]) {
    const response = await orderBurgerApi(data);

    return response;
  }
);
