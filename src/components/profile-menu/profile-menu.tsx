import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { setAuth, setUser } from '../../services/store/slices/auth-slice';
import { useAppDispatch } from '../../services/store/store';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(setUser({ name: '', email: '' }));
      dispatch(setAuth(false));
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.log(error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
