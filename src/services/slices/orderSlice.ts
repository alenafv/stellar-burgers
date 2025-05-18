import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  order: TOrder | null;
  name: string;
  success: boolean;
  loading: boolean;
  error: string | null;
  userOrders: TOrder[];
  getOrderByNumberResponse: TOrder | null;
  request: boolean;
}

// Начальное состояние
export const initialState: OrderState = {
  order: null,
  name: '',
  success: false,
  loading: false,
  error: null,
  userOrders: [],
  getOrderByNumberResponse: null,
  request: false
};

// Асинхронный thunk для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orders/fetchOrderByNumber',
  async (number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

// Слайс для заказов
export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrderByNumberResponse: (state) => state.getOrderByNumberResponse,
    getOrderLoading: (state) => state.loading,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.getOrderByNumberResponse = action.payload;
      });
  }
});

// Селекторы
export const { getOrderByNumberResponse, getOrderLoading, getOrderError } =
  orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
