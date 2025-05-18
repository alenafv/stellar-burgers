import { userSlice, setAuthChecked, fetchUserData, updateUserData, initialState } from '../userSlice';

describe('Слайс пользователя', () => {
  describe('Синхронный редюсер', () => {
    it('Начальная проверка пользователя', () => {
      const action = setAuthChecked(true);
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState.isAuthChecked).toBe(true);
    });
  });

  describe('Асинхронные редюсеры', () => {
    it('Авторизация fulfilled', () => {
      const mockUser = {
        user: {
          email: 'testEmail',
          name: 'testName'
        }
      };
      const action = { type: fetchUserData.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState.user).toEqual(mockUser.user);
      expect(nextState.isAuthenticated).toBe(true);
      expect(nextState.isAuthChecked).toBe(true);
    });

    it('Обновить пользователя fulfilled', () => {
      const mockUser = {
        user: {
          email: 'newEmail',
          name: 'newName'
        }
      };
      const action = { type: updateUserData.fulfilled.type, payload: mockUser };
      const nextState = userSlice.reducer(initialState, action);

      expect(nextState.user).toEqual(mockUser.user);
    });
  });
});
