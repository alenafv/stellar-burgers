import { ingredientsSlice, fetchIngredientsData, initialState } from '../ingredientsSlice';
import { testBun, testIngredient } from './fixtures';

describe('Слайс ингредиентов', () => {
  describe('Асинхронный редюсер', () => {
    it('pending', () => {
      const action = { type: fetchIngredientsData.pending.type };
      const newState = ingredientsSlice.reducer(initialState, action);

      expect(newState.loading).toBe(true);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toHaveLength(0);
    });

    it('fulfilled', () => {
      const mockIngredients = [testBun, testIngredient];
      const action = {
        type: fetchIngredientsData.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientsSlice.reducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBeNull();
      expect(newState.ingredients).toEqual(mockIngredients);
    });

    it('rejected', () => {
      const errorMessage = 'Ошибка загрузки данных';
      const action = {
        type: fetchIngredientsData.rejected.type,
        error: { message: errorMessage }
      };
      const newState = ingredientsSlice.reducer(initialState, action);

      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(errorMessage);
      expect(newState.ingredients).toHaveLength(0);
    });
  });
});
