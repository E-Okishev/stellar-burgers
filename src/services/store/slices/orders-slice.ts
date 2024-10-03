import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrders } from '../actions/orders-actions';

interface IProfileOrders {
  orders: TOrder[];
  isLoading: boolean;
}

export const initialState: IProfileOrders = {
  orders: [],
  isLoading: false
};

const profileOrdersSlice = createSlice({
  name: 'prfileOrders',
  initialState,
  reducers: {
    setProfileOrders(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
      state.isLoading = false;
    },
    clearProfileOrders(state) {
      state.orders = [];
    },
    setOrderFetchLoadings(state) {
      state.isLoading = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchOrders.fulfilled,
      (state, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
        state.isLoading = false;
      }
    );
  }
});

export const { setProfileOrders, clearProfileOrders, setOrderFetchLoadings } =
  profileOrdersSlice.actions;

export default profileOrdersSlice;
