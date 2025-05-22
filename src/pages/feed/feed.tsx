import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { getFeedSelector } from '../../services/feed/slice';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from '../../services/feed/actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(getFeedSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
