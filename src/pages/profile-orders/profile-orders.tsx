import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getOrdersSelector } from '../../services/order/slice';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersSelector);

  return <ProfileOrdersUI orders={orders} />;
};
