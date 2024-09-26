import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from 'react-redux';
import { setIngredient, setIngredients } from '../../services/store/slices/order-slice';
import { useAppSelector } from '../../services/store/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { ingredients } = useAppSelector(state => state.orders);
    const count = useMemo(() => {
      return ingredients.filter((ingredientEnt) => {
        return ingredientEnt._id === ingredient._id;
      }).length;
    }, [ingredients]);
    const handleAdd = () => {
      const bunIngredient = ingredients.findIndex((ingredient) => {
        return ingredient.type === 'bun';
      });
      if (!!bunIngredient && ingredient.type === 'bun') {
        const filtredIngredients = ingredients.filter((ingredient) => {
          return ingredient.type !== 'bun';
        });
        dispatch(setIngredients([...filtredIngredients, { id: '' + bunIngredient, ...ingredient }]));
      }
      dispatch(setIngredient({ id: JSON.stringify(ingredients.length), ...ingredient }));
    };
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
