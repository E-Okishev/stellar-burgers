import { TIngredient, TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFeed {
  orders?: TOrder[];
  total: number;
  totalToday: number;
  ingredients?: TIngredient[];
}

const initialState: IFeed = {
  orders: undefined,
  total: 0,
  totalToday: 0,
  ingredients: undefined
};

const feedSlice = createSlice({
  name: 'feed-slice',
  initialState,
  reducers: {
    getFeed: (state, action: PayloadAction<IFeed>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { getFeed } = feedSlice.actions;
export default feedSlice;
