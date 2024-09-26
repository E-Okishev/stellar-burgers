import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { useEffect } from 'react';
import { getFeedsApi } from '@api';
import { getFeed } from '../../../services/store/slices/feed-slice';

export const useFeed = () => {
  const dispatch = useAppDispatch();

  const { orders } = useAppSelector((store) => store.feed);

  const getFeedHandler = () => {
    getFeedsApi().then((response) => dispatch(getFeed(response)));
  };
  useEffect(() => {
    getFeedHandler();
  }, []);
  return { orders, getFeedHandler };
};
