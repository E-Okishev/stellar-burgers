import { TConstructorIngredient, TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOrder {
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: IOrder = {
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
  }
});

export const {
  setIngredients,
  setIngredient,
  deleteIngredients,
  setOrderRequest,
  setOrderModalData,
  clearOrderModalData
} = ordersSlice.actions;
export default ordersSlice;
