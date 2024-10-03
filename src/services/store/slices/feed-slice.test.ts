import feedSlice, { initialState, getFeed } from './feed-slice';
import { fetchFeed } from '../actions/feed-actions';
import { TOrder, TIngredient } from '@utils-types';

interface IFeed {
  orders?: TOrder[];
  total: number;
  totalToday: number;
  ingredients?: TIngredient[];
}

describe('feedSlice reducer', () => {
  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle getFeed', () => {
    const mockFeedData: IFeed = {
      orders: [
        {
          _id: '1',
          name: 'Order 1',
          number: 1,
          status: 'done',
          ingredients: ['ingredient1', 'ingredient2'],
          createdAt: '2023-09-30',
          updatedAt: '2023-09-30'
        } as TOrder
      ],
      total: 100,
      totalToday: 10,
      ingredients: [
        {
          _id: '1',
          name: 'ingredient1',
          type: 'bun',
          proteins: 20,
          fat: 10,
          carbohydrates: 30,
          calories: 200,
          price: 200,
          image: 'image-url',
          image_large: 'image-large-url',
          image_mobile: 'image-mobile-url'
        } as TIngredient
      ]
    };

    const action = getFeed(mockFeedData);
    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      orders: mockFeedData.orders,
      total: mockFeedData.total,
      totalToday: mockFeedData.totalToday,
      ingredients: mockFeedData.ingredients
    });
  });

  it('should handle fetchFeed.fulfilled', () => {
    const mockFeedData: IFeed = {
      orders: [
        {
          _id: '1',
          name: 'Order 1',
          number: 1,
          status: 'done',
          ingredients: ['ingredient1', 'ingredient2'],
          createdAt: '2023-09-30',
          updatedAt: '2023-09-30'
        } as TOrder
      ],
      total: 100,
      totalToday: 10,
      ingredients: [
        {
          _id: '1',
          name: 'ingredient1',
          type: 'bun',
          proteins: 20,
          fat: 10,
          carbohydrates: 30,
          calories: 200,
          price: 200,
          image: 'image-url',
          image_large: 'image-large-url',
          image_mobile: 'image-mobile-url'
        } as TIngredient
      ]
    };

    const action = {
      type: fetchFeed.fulfilled.type,
      payload: mockFeedData
    };

    const newState = feedSlice.reducer(initialState, action);

    expect(newState).toEqual({
      orders: mockFeedData.orders,
      total: mockFeedData.total,
      totalToday: mockFeedData.totalToday,
      ingredients: mockFeedData.ingredients
    });
  });
});
