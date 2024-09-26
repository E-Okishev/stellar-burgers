import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { orderBurgerApi } from '@api';
import {
  clearOrderModalData,
  setOrderModalData,
  setOrderRequest
} from '../../services/store/slices/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { ingredients, orderRequest, orderModalData } = useAppSelector(
    (state) => state.orders
  );

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const bunIngredient = useMemo(
    () => ingredients.find((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );

  const filtredIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type !== 'bun'),
    [ingredients]
  );

  const constructorItems = {
    bun: bunIngredient,
    ingredients: filtredIngredients
  };

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;

    try {
      dispatch(setOrderRequest(true));
      const sortIngrediens = ingredients.map((ingredient) => ingredient._id);
      const response = await orderBurgerApi([
        ...sortIngrediens,
        sortIngrediens[0]
      ]);

      if (response?.order) {
        dispatch(setOrderModalData(response.order));
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setOrderRequest(false));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };
  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems?.ingredients.reduce(
      (s, { price }) => s + price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);
  return (
    <BurgerConstructorUI
      isAuthenticated={isAuthenticated}
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
