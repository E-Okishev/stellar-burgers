import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { useAppDispatch } from '../../services/store/store';
import { setAuth, setUser } from '../../services/store/slices/auth-slice';
import { getUserApi } from '@api';

export const AuthProvider = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getCookie('accessToken')) {
      getUserApi().then((responce) => {
        dispatch(setUser(responce.user));
        dispatch(setAuth(true));
      });
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
