import profileOrdersSlice, { initialState, setProfileOrders, clearProfileOrders, setOrderFetchLoadings } from './orders-slice';
import { fetchOrders } from '../actions/orders-actions';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice reducer', () => {
  it('should return the initial state', () => {
    expect(profileOrdersSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setProfileOrders', () => {
    const mockOrders: TOrder[] = [
      { _id: '1', ingredients: [], status: 'done', name: 'Order 1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), number: 1 },
      { _id: '2', ingredients: [], status: 'pending', name: 'Order 2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), number: 2 },
    ];
    const action = setProfileOrders(mockOrders);
    const newState = profileOrdersSlice.reducer(initialState, action);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.isLoading).toBe(false);
  });

  it('should handle clearProfileOrders', () => {
    const initialStateWithOrders = { orders: [{ _id: '1', ingredients: [], status: 'done', name: 'Order 1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), number: 1 }], isLoading: false };
    const action = clearProfileOrders();
    const newState = profileOrdersSlice.reducer(initialStateWithOrders, action);
    expect(newState.orders).toEqual([]);
  });

  it('should handle setOrderFetchLoadings', () => {
    const action = setOrderFetchLoadings();
    const newState = profileOrdersSlice.reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle fetchOrders.pending', () => {
    const action = { type: fetchOrders.pending.type };
    const newState = profileOrdersSlice.reducer(initialState, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle fetchOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      { _id: '1', ingredients: [], status: 'done', name: 'Order 1', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), number: 1 },
      { _id: '2', ingredients: [], status: 'pending', name: 'Order 2', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), number: 2 },
    ];
    const action = {
      type: fetchOrders.fulfilled.type,
      payload: mockOrders,
    };
    const newState = profileOrdersSlice.reducer(initialState, action);
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.isLoading).toBe(false);
  });
});
