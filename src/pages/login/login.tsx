import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { Navigate } from 'react-router-dom';
import { fetchLogin } from '../../services/store/actions/auth-actions';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, shouldRedirect, redirectLink } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(fetchLogin({ email, password }));
  };

  if (!isAuthenticated) {
    return (
      <LoginUI
        errorText=''
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    );
  }

  return <Navigate to={shouldRedirect ? redirectLink : '/'} />;
};
