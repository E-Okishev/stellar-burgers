import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector } from '../../services/store/store';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { ingredients } = useAppSelector(state => state.orders);
  const bunIngredient = useMemo(() => {
    return ingredients.find((ingredient) => {
      return ingredient.type === 'bun';
    });
  }, [ingredients]);

  const filtredIngredients = useMemo(() => {
    return ingredients.filter((ingredient) => {
      return ingredient.type !== 'bun';
    });
  }, [ingredients]);

  const constructorItems = {
    bun: bunIngredient,
    ingredients: filtredIngredients
  };
  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };
  const closeOrderModal = () => {
  };
  const price = useMemo(
    () => {
      const bunPrice = (constructorItems.bun ? constructorItems.bun.price * 2 : 0);
      const ingredientsPrice = constructorItems?.ingredients.reduce((s, { price }) => {
        return s + price;
      }, 0);
      return bunPrice + ingredientsPrice;
    }
    , [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
