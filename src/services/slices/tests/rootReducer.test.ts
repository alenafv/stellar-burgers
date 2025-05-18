import { rootReducer } from '../../store';
import { initialState as initialStateConstructor } from '../burgerConstructorSlice';
import { initialState as initialStateFeeds } from '../feedSlice';
import { initialState as initialStateIngredients } from '../ingredientsSlice';
import { initialState as initialStateOrder } from '../orderSlice';
import { initialState as initialStateUser } from '../userSlice';

describe('rootReducer', () => {
  it('должен возвращать начальное состояние', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual({
      burgerConstructor: initialStateConstructor,
      feeds: initialStateFeeds,
      ingredients: initialStateIngredients,
      orders: initialStateOrder,
      user: initialStateUser
    });
  });
});
