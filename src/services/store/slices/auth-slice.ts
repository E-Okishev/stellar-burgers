import { TUser } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLogin,
  fetchLogout,
  fetchRegister,
  fetchUser,
  updateUser
} from '../actions/auth-actions';
import { TAuthResponse, TUserResponse } from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';

interface IAuthState {
  user: TUser;
  isAuthenticated: boolean;
  shouldRedirect: boolean;
  redirectLink: string;
}

export const initialState: IAuthState = {
  user: {} as TUser,
  isAuthenticated: false,
  shouldRedirect: false,
  redirectLink: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setShouldRedirect(state, action: PayloadAction<boolean>) {
      state.shouldRedirect = action.payload;
    },
    setRedirectLink(state, action: PayloadAction<string>) {
      state.redirectLink = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchRegister.fulfilled,
      (state, action: PayloadAction<TAuthResponse>) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    );
    builder.addCase(
      fetchLogin.fulfilled,
      (state, action: PayloadAction<TAuthResponse>) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    );
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<TUserResponse>) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(fetchUser.rejected, (state) => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<TUserResponse>) => {
        state.user = action.payload.user;
      }
    );
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = { name: '', email: '' };
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  }
});

export const { setAuth, setUser, setShouldRedirect, setRedirectLink } =
  authSlice.actions;
export default authSlice;
