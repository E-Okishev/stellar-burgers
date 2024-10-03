import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { useEffect } from 'react';
import { fetchFeed } from '../../../services/store/actions/feed-actions';

export const useFeed = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((store) => store.feed);

  const getFeedHandler = () => {
    dispatch(fetchFeed());
  };
  useEffect(() => {
    getFeedHandler();
  }, []);
  return { orders, getFeedHandler };
};
