import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi, registerUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { setAuth, setUser } from '../../services/store/slices/auth-slice';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const responce = await loginUserApi({ email, password });
      setCookie('accessToken', responce.accessToken);
      localStorage.setItem('refreshToken', responce.refreshToken);
      dispatch(setAuth(true));
      dispatch(setUser(responce.user));
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginUI
        errorText=""
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    );
  }

  return (
    <Navigate to={'/'} />
  );
};
