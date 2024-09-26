import { TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IOrder {
  ingredients: TConstructorIngredient[];
}

const initialState: IOrder = {
  ingredients: []
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
      state.ingredients = state.ingredients.filter((ingredient) => {
        return ingredient.id !== action.payload;
      });
    }
  }
});

export const { setIngredients, setIngredient, deleteIngredients } = ordersSlice.actions;
export default ordersSlice;
