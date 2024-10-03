import store from './store';
import authSlice from './slices/auth-slice';
import feedSlice from './slices/feed-slice';
import ingredientsSlice from './slices/ingredients-slice';
import ordersSlice from './slices/order-slice';
import profileOrdersSlice from './slices/orders-slice';

describe('store', () => {
  it('stores all slices', () => {
    const state = store.getState();
    expect(state).toHaveProperty(authSlice.name);
    expect(state).toHaveProperty(feedSlice.name);
    expect(state).toHaveProperty(ingredientsSlice.name);
    expect(state).toHaveProperty(ordersSlice.name);
    expect(state).toHaveProperty(profileOrdersSlice.name);
  });
});
