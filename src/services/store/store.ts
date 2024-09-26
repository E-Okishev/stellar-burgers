import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import feedSlice from './slices/feed-slice';
import ingredientsSlice from './slices/ingredients-slice';
import authSlice from './slices/auth-slice';
import ordersSlice from './slices/order-slice';
import profileOrdersSlice from './slices/orders-slice';

const store = configureStore({
  reducer: {
    feed: feedSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    auth: authSlice.reducer,
    orders: ordersSlice.reducer,
    profileOrders: profileOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
