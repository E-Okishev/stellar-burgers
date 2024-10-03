import authSlice, { initialState, setAuth, setUser, setShouldRedirect, setRedirectLink } from './auth-slice';
import { fetchLogin, fetchLogout, fetchRegister, fetchUser, updateUser } from '../actions/auth-actions';
import { TAuthResponse, TUserResponse } from '../../../utils/burger-api';
import { TUser } from '@utils-types';

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockGetItem = jest.fn();

Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    getItem: mockGetItem,
  },
  writable: true,
});

describe('authSlice reducer', () => {
  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setAuth', () => {
    const action = setAuth(true);
    const newState = authSlice.reducer(initialState, action);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('should handle setUser', () => {
    const mockUser: TUser = { name: 'John Doe', email: 'john.doe@example.com' };
    const action = setUser(mockUser);
    const newState = authSlice.reducer(initialState, action);
    expect(newState.user).toEqual(mockUser);
  });

  it('should handle setShouldRedirect', () => {
    const action = setShouldRedirect(true);
    const newState = authSlice.reducer(initialState, action);
    expect(newState.shouldRedirect).toBe(true);
  });

  it('should handle setRedirectLink', () => {
    const action = setRedirectLink('/home');
    const newState = authSlice.reducer(initialState, action);
    expect(newState.redirectLink).toBe('/home');
  });

  it('should handle fetchRegister.fulfilled', () => {
    const mockResponse: TAuthResponse = {
      success: true,
      user: { name: 'Jane Doe', email: 'jane.doe@example.com' },
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };
    const action = {
      type: fetchRegister.fulfilled.type,
      payload: mockResponse,
    };

    const newState = authSlice.reducer(initialState, action);

    expect(newState.user).toEqual(mockResponse.user);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('should handle fetchLogin.fulfilled', () => {
    const mockResponse: TAuthResponse = {
      success: true,
      user: { name: 'John Smith', email: 'john.smith@example.com' },
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };
    const action = {
      type: fetchLogin.fulfilled.type,
      payload: mockResponse,
    };

    const newState = authSlice.reducer(initialState, action);

    expect(newState.user).toEqual(mockResponse.user);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('should handle fetchUser.fulfilled', () => {
    const mockResponse: TUserResponse = {
      user: { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
      success: true,
    };
    const action = {
      type: fetchUser.fulfilled.type,
      payload: mockResponse,
    };

    const newState = authSlice.reducer(initialState, action);

    expect(newState.user).toEqual(mockResponse.user);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('should handle fetchUser.rejected', () => {
    const action = {
      type: fetchUser.rejected.type,
    };

    const newState = authSlice.reducer(initialState, action);

    expect(newState.isAuthenticated).toBe(false);
  });

  it('should handle updateUser.fulfilled', () => {
    const initialUser: TUser = { name: 'Bob', email: 'bob@example.com' };
    const updatedResponse: TUserResponse = {
      success: true,
      user: { name: 'Bob Updated', email: 'bob.updated@example.com' },
    };
    const initialStateWithUser = { ...initialState, user: initialUser };

    const action = {
      type: updateUser.fulfilled.type,
      payload: updatedResponse,
    };

    const newState = authSlice.reducer(initialStateWithUser, action);

    expect(newState.user).toEqual(updatedResponse.user);
  });

  it('should handle fetchLogout.fulfilled', () => {
    const action = {
      type: fetchLogout.fulfilled.type,
    };

    const newState = authSlice.reducer(initialState, action);

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.user).toEqual({ name: '', email: '' });
  });
});
