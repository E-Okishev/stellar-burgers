import { TIngredient } from '@utils-types';
import { useDispatch } from 'react-redux';
import {
  setIngredients,
  setIngredient
} from '../../../services/store/slices/order-slice';
import { useAppSelector } from '../../../services/store/store';

export const useIngredientManiplation = (ingredient: TIngredient) => {
  const dispatch = useDispatch();
  const { ingredients } = useAppSelector((state) => state.orders);

  const handleAdd = () => {
    const bunIngredientId = ingredients.findIndex(
      (ingredient) => ingredient.type === 'bun'
    );

    if (ingredient.type === 'bun') {
      const filtredIngredients = ingredients.filter(
        (ingredient) => ingredient.type !== 'bun'
      );
      dispatch(
        setIngredients([
          { id: '' + bunIngredientId, ...ingredient },
          ...filtredIngredients
        ])
      );
      return;
    }
    dispatch(
      setIngredient({ id: JSON.stringify(ingredients.length), ...ingredient })
    );
  };

  return { handleAdd, ingredients };
};
