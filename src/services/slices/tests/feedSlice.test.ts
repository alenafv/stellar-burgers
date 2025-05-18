import { feedsSlice, fetchFeedsData, initialState } from '../feedSlice';
import { testOrder1, testOrder2 } from './fixtures';

describe('Слайс ленты заказов', () => {
  describe('Асинхронный редюсер', () => {
    it('fulfilled', () => {
      const mockFeedsData = {
        orders: [testOrder1, testOrder2],
        total: 15,
        totalToday: 5
      };

      const action = {
        type: fetchFeedsData.fulfilled.type,
        payload: mockFeedsData
      };

      const nextState = feedsSlice.reducer(initialState, action);

      expect(nextState.orders).toEqual(mockFeedsData.orders);
      expect(nextState.total).toEqual(mockFeedsData.total);
      expect(nextState.totalToday).toEqual(mockFeedsData.totalToday);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toBeNull();
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка загрузки данных';

      const action = {
        type: fetchFeedsData.rejected.type,
        error: { message: errorMessage }
      };

      const nextState = feedsSlice.reducer(initialState, action);

      expect(nextState.orders).toEqual(initialState.orders);
      expect(nextState.isLoading).toBe(false);
      expect(nextState.error).toEqual(errorMessage);
    });

    it('pending', () => {
      const action = {
        type: fetchFeedsData.pending.type
      };

      const nextState = feedsSlice.reducer(initialState, action);

      expect(nextState.isLoading).toBe(true);
      expect(nextState.error).toBeNull();
    });
  });
});
