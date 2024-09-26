import { TUser } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  user: TUser;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  user: {} as TUser,
  isAuthenticated: false
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
    }
  }
});

export const { setAuth, setUser } = authSlice.actions;
export default authSlice;
