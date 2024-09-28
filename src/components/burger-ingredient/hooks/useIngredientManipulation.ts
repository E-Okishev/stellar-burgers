import { TIngredient } from '@utils-types';
import {
  setIngredients,
  setIngredient
} from '../../../services/store/slices/order-slice';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { v4 as uuidv4 } from 'uuid';

export const useIngredientManiplation = (ingredient: TIngredient) => {
  const dispatch = useAppDispatch();
  const { ingredients } = useAppSelector((state) => state.orders);

  const id = uuidv4();

  const handleAdd = () => {
    const bunIngredient = ingredients.find(
      (ingredient) => ingredient.type === 'bun'
    );

    if (ingredient.type === 'bun') {
      const filtredIngredients = ingredients.filter(
        (ingredient) => ingredient.type !== 'bun'
      );
      dispatch(
        setIngredients([
          { id: '' + bunIngredient?.id, ...ingredient },
          ...filtredIngredients
        ])
      );
      return;
    }
    dispatch(setIngredient({ id: id, ...ingredient }));
  };

  return { handleAdd, ingredients };
};
