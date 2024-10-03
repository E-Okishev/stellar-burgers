import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store/store';
import { getCookie } from '../../utils/cookie';

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && !getCookie('accessToken')) {
      navigation('/register');
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};
