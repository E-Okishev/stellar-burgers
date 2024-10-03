import { TIngredient } from '@utils-types';
import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredients } from '../actions/ingredients-actions';

interface IIngredients {
  ingredients: TIngredient[];
  isLoading: boolean;
}

export const initialState: IIngredients = {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchIngredients.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      }
    );
  }
});

export const { getIngredients, setIngredientsIsLoaded, resetIngredients } =
  ingredientsSlice.actions;
export default ingredientsSlice;
