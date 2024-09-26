import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import { useIngredients } from '../../services/hooks/useIngredients';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  useIngredients();

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return <OrdersListUI orderByDate={orderByDate} />;
});
