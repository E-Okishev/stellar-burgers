import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { getIngredientsApi } from '@api';
import {
  getIngredients,
  setIngredientsIsLoaded,
  resetIngredients
} from '../store/slices/ingredients-slice';

export const useIngredients = () => {
  const dispatch = useAppDispatch();

  const getIngredientsHandler = () => {
    dispatch(setIngredientsIsLoaded());
    getIngredientsApi().then((response) => dispatch(getIngredients(response)));
  };
  useEffect(() => {
    getIngredientsHandler();
    return () => {
      dispatch(resetIngredients());
    };
  }, []);
};
