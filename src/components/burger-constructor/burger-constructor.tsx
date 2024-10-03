import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import {
  clearIngredients,
  clearOrderModalData
} from '../../services/store/slices/order-slice';
import { addOrder } from '../../services/store/actions/order-actions';
import { useNavigate } from 'react-router-dom';
import {
  setRedirectLink,
  setShouldRedirect
} from '../../services/store/slices/auth-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();

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

    if (!!!isAuthenticated) {
      dispatch(setRedirectLink('/'));
      dispatch(setShouldRedirect(true));
      navigate('/login');
      return;
    }

    const sortIngrediens = ingredients.map((ingredient) => ingredient._id);
    dispatch(addOrder([...sortIngrediens, sortIngrediens[0]]));
    dispatch(clearIngredients());
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
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
