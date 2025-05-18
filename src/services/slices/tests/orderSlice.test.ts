import { orderSlice, fetchOrderByNumber, initialState } from '../orderSlice';
import { testOrder1 } from './fixtures';

describe('Слайс заказов', () => {
  describe('Асинхронный редюсер', () => {
    it('pending', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const nextState = orderSlice.reducer(initialState, action);

      expect(nextState.loading).toBe(true);
      expect(nextState.error).toBeNull();
      expect(nextState.getOrderByNumberResponse).toBeNull();
    });

    it('fulfilled', () => {
      const mockOrder = testOrder1;
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const nextState = orderSlice.reducer(initialState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBeNull();
      expect(nextState.getOrderByNumberResponse).toEqual(mockOrder);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка загрузки заказа';
      const action = {
        type: fetchOrderByNumber.rejected.type,
        error: { message: errorMessage }
      };
      const nextState = orderSlice.reducer(initialState, action);

      expect(nextState.loading).toBe(false);
      expect(nextState.error).toBe(errorMessage);
      expect(nextState.getOrderByNumberResponse).toBeNull();
    });
  });
});
