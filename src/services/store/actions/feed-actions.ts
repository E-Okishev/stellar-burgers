import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk(
  'feeds/fetchFeeds',
  async function () {
    const response = await getFeedsApi();

    return response;
  }
);
