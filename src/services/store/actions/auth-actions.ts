import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async function (data: TRegisterData) {
    const response = await registerUserApi(data);

    return response;
  }
);

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async function (data: TLoginData) {
    const response = await loginUserApi(data);

    return response;
  }
);

export const fetchUser = createAsyncThunk('auth/fetchUser', async function () {
  const response = await getUserApi();

  return response;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async function (user: Partial<TRegisterData>) {
    const response = await updateUserApi(user);

    return response;
  }
);

export const fetchLogout = createAsyncThunk(
  'auth/fetchLogout',
  async function () {
    const response = await logoutApi();

    return response;
  }
);
