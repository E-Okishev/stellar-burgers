import ingredientsSlice, { initialState, getIngredients, setIngredientsIsLoaded, resetIngredients } from './ingredients-slice';
import { fetchIngredients } from '../actions/ingredients-actions';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle getIngredients', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 20,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url',
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 15,
        calories: 50,
        price: 50,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url',
      },
    ];
    const action = getIngredients(mockIngredients);
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle setIngredientsIsLoaded', () => {
    const action = setIngredientsIsLoaded();
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle resetIngredients', () => {
    const initialStateWithIngredients = {
      ingredients: [
        {
          _id: '1',
          name: 'Ingredient 1',
          type: 'bun',
          proteins: 20,
          fat: 10,
          carbohydrates: 30,
          calories: 200,
          price: 100,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url',
        },
      ],
      isLoading: false,
    };
    const action = resetIngredients();
    const newState = ingredientsSlice.reducer(initialStateWithIngredients, action);
    expect(newState.ingredients).toEqual([]);
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 20,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url',
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 15,
        calories: 50,
        price: 50,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url',
      },
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };
    const newState = ingredientsSlice.reducer(initialState, action);
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.isLoading).toBe(false);
  });
});
