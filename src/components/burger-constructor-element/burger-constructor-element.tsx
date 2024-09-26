import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import {
  deleteIngredients,
  setIngredients
} from '../../services/store/slices/order-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector((state) => state.orders);
    const handleMoveDown = () => {
      dispatch(
        setIngredients([
          ...ingredients.slice(0, index + 1),
          ingredients[index + 2],
          ingredient,
          ...ingredients.slice(index + 3, ingredients.length)
        ])
      );
    };

    const handleMoveUp = () => {
      dispatch(
        setIngredients([
          ...ingredients.slice(0, index),
          ingredient,
          ingredients[index],
          ...ingredients.slice(index + 2, ingredients.length)
        ])
      );
    };

    const handleClose = () => {
      dispatch(deleteIngredients(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
