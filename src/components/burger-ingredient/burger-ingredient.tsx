import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useIngredientManiplation } from './hooks/useIngredientManipulation';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const { handleAdd, ingredients } = useIngredientManiplation(ingredient);

    const count = useMemo(() => {
      const ingredientCount = ingredients.filter(
        (ingredientEnt) => ingredientEnt._id === ingredient._id
      ).length;

      return ingredientCount;
    }, [ingredients]);
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
