import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useProfileOrders } from '../../services/hooks/useProfileOrders';
import { useAppSelector } from '../../services/store/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isLoading } = useAppSelector((state) => state.profileOrders);

  useProfileOrders();

  if (isLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
