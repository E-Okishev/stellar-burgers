import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useAppDispatch } from '../../services/store/store';

import { fetchUser } from '../../services/store/actions/auth-actions';

export const AuthProvider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(fetchUser());
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
