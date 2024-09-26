import { TIngredient } from '@utils-types';
import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IIngredients {
  ingredients: TIngredient[];
  isLoading: boolean;
}

const initialState: IIngredients = {
  ingredients: [],
  isLoading: false
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    },
    setIngredientsIsLoaded: (state) => {
      state.isLoading = true;
    },
    resetIngredients: (state) => {
      state.ingredients = [];
    }
  }
});

export const { getIngredients, setIngredientsIsLoaded, resetIngredients } =
  ingredientsSlice.actions;
export default ingredientsSlice;
