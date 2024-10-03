import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store/store';
import { fetchLogout } from '../../services/store/actions/auth-actions';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
