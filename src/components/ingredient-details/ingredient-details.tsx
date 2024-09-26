import { FC, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useAppSelector } from '../../services/store/store';
import { useIngredients } from '../../services/hooks/useIngredients';

type ingredientDetailsProps = {
  id: string;
}

export const IngredientDetails: FC<ingredientDetailsProps> = ({ id }) => {
  /** TODO: взять переменную из стора */
  const { ingredients } = useAppSelector(state => state.ingredients);
  useIngredients();
  const ingredientData = useMemo(() => {
    return ingredients.find((ingredient) => {
      return ingredient._id === id;
    });
  }, [ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
