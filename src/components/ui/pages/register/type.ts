import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';
import { TRegisterError } from '@utils-types';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
  error: TRegisterError;
};
