import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { getIngredientsApi } from '@api';
import {
  getIngredients,
  setIngredientsIsLoaded,
  resetIngredients
} from '../store/slices/ingredients-slice';
import { fetchIngredients } from '../store/actions/ingredients-actions';

export const useIngredients = () => {
  const dispatch = useAppDispatch();

  const getIngredientsHandler = () => {
    dispatch(fetchIngredients());
  };

  useEffect(() => {
    getIngredientsHandler();
    return () => {
      dispatch(resetIngredients());
    };
  }, []);
};
