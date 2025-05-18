import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorReducer, addItem, removeItem, moveItemUp, moveItemDown, clearConstructor } from '../burgerConstructorSlice';
import { testBun, testIngredient, testSouce } from './fixtures';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      burgerConstructor: burgerConstructorReducer
    },
    preloadedState: {
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null,
        loading: false,
        error: null,
        ...preloadedState
      }
    }
  });
};

describe('burgerConstructorSlice', () => {
  describe('addItem', () => {
    it('Добавление булки', () => {
      const store = createTestStore();
      store.dispatch(addItem(testBun));
      const state = store.getState().burgerConstructor;
      expect(state.bun).toEqual(expect.objectContaining(testBun));
    });

    it('Добавление начинки', () => {
      const store = createTestStore();
      store.dispatch(addItem(testIngredient));
      const state = store.getState().burgerConstructor;
      expect(state.ingredients).toContainEqual(expect.objectContaining(testIngredient));
    });
  });

  describe('removeItem', () => {
    it('Удаление начинки', () => {
      const ingredientId = 'test-id';
      const store = createTestStore({
        ingredients: [{ ...testIngredient, id: ingredientId }]
      });
      store.dispatch(removeItem(ingredientId));
      const state = store.getState().burgerConstructor;
      expect(state.ingredients).not.toContainEqual(expect.objectContaining({ id: ingredientId }));
    });
  });

  describe('moveItemUp', () => {
    it('Перемещение вверх', () => {
      const ingredient1 = { ...testIngredient, id: '1' };
      const ingredient2 = { ...testSouce, id: '2' };
      const store = createTestStore({
        ingredients: [ingredient1, ingredient2]
      });
      store.dispatch(moveItemUp(ingredient2.id));
      const state = store.getState().burgerConstructor;
      expect(state.ingredients[0].id).toEqual(ingredient2.id);
    });
  });

  describe('moveItemDown', () => {
    it('Перемещение вниз', () => {
      const ingredient1 = { ...testIngredient, id: '1' };
      const ingredient2 = { ...testSouce, id: '2' };
      const store = createTestStore({
        ingredients: [ingredient1, ingredient2]
      });
      store.dispatch(moveItemDown(ingredient1.id));
      const state = store.getState().burgerConstructor;
      expect(state.ingredients[1].id).toEqual(ingredient1.id);
    });
  });

  describe('clearConstructor', () => {
    it('Очищение конструктора', () => {
      const store = createTestStore({
        bun: testBun,
        ingredients: [testIngredient, testSouce]
      });
      store.dispatch(clearConstructor());
      const state = store.getState().burgerConstructor;
      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
    });
  });
});
