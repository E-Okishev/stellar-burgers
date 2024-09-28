import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { TRegisterError } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { Navigate } from 'react-router-dom';
import { fetchRegister } from '../../services/store/actions/auth-actions';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, shouldRedirect, redirectLink } = useAppSelector(
    (state) => state.auth
  );

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

    await dispatch(
      fetchRegister({
        email,
        name: userName,
        password
      })
    );
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

  return <Navigate to={shouldRedirect ? redirectLink : '/'} />;
};
