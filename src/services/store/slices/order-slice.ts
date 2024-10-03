import { TConstructorIngredient, TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addOrder } from '../actions/order-actions';
import { TNewOrderResponse } from '@api';

interface IOrder {
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: IOrder = {
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients = [...state.ingredients, action.payload];
    },
    clearIngredients(state) {
      state.ingredients = [];
    },
    setIngredients(state, action: PayloadAction<TConstructorIngredient[]>) {
      state.ingredients = action.payload;
    },
    deleteIngredients(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<TOrder>) {
      state.orderModalData = action.payload;
    },
    clearOrderModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      addOrder.fulfilled,
      (state, action: PayloadAction<TNewOrderResponse>) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      }
    );
    builder.addCase(addOrder.pending, (state) => {
      state.orderRequest = true;
    });
  }
});

export const {
  setIngredients,
  setIngredient,
  deleteIngredients,
  setOrderRequest,
  setOrderModalData,
  clearOrderModalData,
  clearIngredients
} = ordersSlice.actions;
export default ordersSlice;
