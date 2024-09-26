import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { useFeed } from './hooks/useFeed';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, getFeedHandler } = useFeed();

  if (orders && orders.length) {
    return (
      <FeedUI orders={orders} handleGetFeeds={getFeedHandler} />
    );
  }
  return <Preloader />;
};
