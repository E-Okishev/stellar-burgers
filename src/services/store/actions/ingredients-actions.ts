import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async function () {
    const response = await getIngredientsApi();

    return response;
  }
);
