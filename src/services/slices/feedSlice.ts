import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { RootState } from '../store';
import { TOrdersData, TOrder } from '@utils-types';

// Типы состояния
interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
export const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

// Асинхронный thunk для загрузки ленты заказов
export const fetchFeedsData = createAsyncThunk<TOrdersData, void>(
  'feeds/fetchFeedsData',
  async () => await getFeedsApi()
);

// Слайс для ленты заказов
export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeedsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

// Селекторы
export const getFeedState = (state: RootState) => state.feeds;

export const feedReducer = feedsSlice.reducer;
