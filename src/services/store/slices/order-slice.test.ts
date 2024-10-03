import ordersSlice, { initialState, setIngredient, clearIngredients, setIngredients, deleteIngredients, setOrderRequest, setOrderModalData, clearOrderModalData } from './order-slice';
import { addOrder } from '../actions/order-actions';
import { TNewOrderResponse } from '@api';
import { TConstructorIngredient, TOrder } from '@utils-types';

describe('ordersSlice reducer', () => {
  it('should return the initial state', () => {
    expect(ordersSlice.reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setIngredient', () => {
    const mockIngredient: TConstructorIngredient = {
      id: '1',
      _id: '1',
      name: 'Ingredient 1',
      type: 'bun',
      proteins: 20,
      fat: 10,
      carbohydrates: 30,
      calories: 200,
      price: 100,
      image: 'image_url',
      image_large: 'image_large_url',
      image_mobile: 'image_mobile_url',
    };
    const action = setIngredient(mockIngredient);
    const newState = ordersSlice.reducer(initialState, action);
    expect(newState.ingredients).toEqual([mockIngredient]);
  });

  it('should handle clearIngredients', () => {
    const initialStateWithIngredients = { 
      ingredients: [{ 
        id: '1', 
        _id: '1', 
        name: 'Ingredient 1', 
        type: 'bun', 
        proteins: 20, 
        fat: 10, 
        carbohydrates: 30, 
        calories: 200, 
        price: 100, 
        image: 'image_url', 
        image_large: 'image_large_url', 
        image_mobile: 'image_mobile_url' 
      }], 
      orderRequest: false, 
      orderModalData: null 
    };
    const action = clearIngredients();
    const newState = ordersSlice.reducer(initialStateWithIngredients, action);
    expect(newState.ingredients).toEqual([]);
  });

  it('should handle setIngredients', () => {
    const mockIngredients: TConstructorIngredient[] = [
      {
        id: '1',
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 20,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 100,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url',
      },
      {
        id: '2',
        _id: '2',
        name: 'Ingredient 2',
        type: 'sauce',
        proteins: 5,
        fat: 2,
        carbohydrates: 15,
        calories: 50,
        price: 50,
        image: 'image_url',
        image_large: 'image_large_url',
        image_mobile: 'image_mobile_url',
      },
    ];
    const action = setIngredients(mockIngredients);
    const newState = ordersSlice.reducer(initialState, action);
    expect(newState.ingredients).toEqual(mockIngredients);
  });

  it('should handle deleteIngredients', () => {
    const initialStateWithIngredients = {
      ingredients: [
        {
          id: '1',
          _id: '1',
          name: 'Ingredient 1',
          type: 'bun',
          proteins: 20,
          fat: 10,
          carbohydrates: 30,
          calories: 200,
          price: 100,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url',
        },
        {
          id: '2',
          _id: '2',
          name: 'Ingredient 2',
          type: 'sauce',
          proteins: 5,
          fat: 2,
          carbohydrates: 15,
          calories: 50,
          price: 50,
          image: 'image_url',
          image_large: 'image_large_url',
          image_mobile: 'image_mobile_url',
        },
      ],
      orderRequest: false,
      orderModalData: null,
    };
    const action = deleteIngredients('1');
    const newState = ordersSlice.reducer(initialStateWithIngredients, action);
    expect(newState.ingredients).toEqual([{
      id: '2',
      _id: '2',
      name: 'Ingredient 2',
      type: 'sauce',
      proteins: 5,
      fat: 2,
      carbohydrates: 15,
      calories: 50,
      price: 50,
      image: 'image_url',
      image_large: 'image_large_url',
      image_mobile: 'image_mobile_url',
    }]);
  });

  it('should handle setOrderRequest', () => {
    const action = setOrderRequest(true);
    const newState = ordersSlice.reducer(initialState, action);
    expect(newState.orderRequest).toBe(true);
  });

  it('should handle setOrderModalData', () => {
    const mockOrder: TOrder = { 
      _id: '1', 
      name: 'Order 1', 
      number: 1, 
      ingredients: [], 
      status: 'done',
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
    };
    const action = setOrderModalData(mockOrder);
    const newState = ordersSlice.reducer(initialState, action);
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  it('should handle clearOrderModalData', () => {
    const initialStateWithModalData = {
      ingredients: [],
      orderRequest: false,
      orderModalData: { 
        _id: '1',
        name: 'Order 1',
        number: 1,
        ingredients: [],
        status: 'done', 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), 
      }, 
    };
    const action = clearOrderModalData();
    const newState = ordersSlice.reducer(initialStateWithModalData, action);
    expect(newState.orderModalData).toBeNull();
  });

  it('should handle addOrder.fulfilled', () => {
    const mockResponse: TNewOrderResponse = {
      success: true,
      name: 'Order 1',
      order: { 
        _id: '1', 
        name: 'Order 1', 
        number: 1, 
        ingredients: [], 
        status: 'done', 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, 
    }
    const action = {
      type: addOrder.fulfilled.type,
      payload: mockResponse,
    };
  
    const newState = ordersSlice.reducer(initialState, action);
  
    expect(newState.orderModalData).toEqual(mockResponse.order);
    expect(newState.orderRequest).toBe(false);
  });
  

  it('should handle addOrder.pending', () => {
    const action = { type: addOrder.pending.type };
    const newState = ordersSlice.reducer(initialState, action);
    expect(newState.orderRequest).toBe(true);
  });
});