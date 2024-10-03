import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async function () {
    const response = await getOrdersApi();

    return response;
  }
);
