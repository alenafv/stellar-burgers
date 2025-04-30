import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeedsData, getFeedState } from '../../services/slices/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(getFeedState);

  useEffect(() => {
    dispatch(fetchFeedsData());
  }, [dispatch]);

  const orders: TOrder[] = feeds.orders;

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeedsData())} />
  );
};
