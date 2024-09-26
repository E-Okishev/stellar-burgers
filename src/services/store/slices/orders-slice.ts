import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IProfileOrders {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: IProfileOrders = {
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
  }
});

export const { setProfileOrders, clearProfileOrders, setOrderFetchLoadings } =
  profileOrdersSlice.actions;

export default profileOrdersSlice;
