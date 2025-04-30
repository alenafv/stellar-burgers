import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchUserOrders,
  selectUserState
} from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeedsData } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedsData());
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const { userOrders } = useSelector(selectUserState);

  return <ProfileOrdersUI orders={userOrders} />;
};
