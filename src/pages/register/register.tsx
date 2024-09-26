import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterError } from '@utils-types';
import { registerUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { setAuth, setUser } from '../../services/store/slices/auth-slice';
import { Navigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<TRegisterError>({
    userName: false,
    email: false,
    password: false
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const responce = await registerUserApi({
        email,
        name: userName,
        password
      });
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
      <RegisterUI
        errorText=''
        email={email}
        userName={userName}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        setUserName={setUserName}
        handleSubmit={handleSubmit}
        error={error}
      />
    );
  }

  return <Navigate to={'/'} />;
};
