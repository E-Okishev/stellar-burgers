import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { deleteIngredients } from '../../services/store/slices/order-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const { ingredients } = useAppSelector(state => state.orders);
    console.log('ingredients', ingredients);
    const handleMoveDown = () => {
    };

    const handleMoveUp = () => {
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
