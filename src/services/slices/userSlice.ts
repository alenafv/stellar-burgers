import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TOrder, TUser } from '@utils-types';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  getOrdersApi,
  TRegisterData,
  TLoginData
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

// Типы состояния
interface UserState {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
  userOrders: TOrder[];
  request: boolean;
}

// Начальное состояние
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loading: false,
  error: null,
  userOrders: [],
  request: false
};

// Асинхронные thunks
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, api) => {
    try {
      const response = await registerUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    try {
      const response = await getUserApi();
      getCookie('accessToken');
      localStorage.getItem('refreshToken');
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (data: TRegisterData) => {
    try {
      const response = await updateUserApi(data);
      return response;
    } catch (err) {
      throw err;
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await logoutApi();
    deleteCookie('accessToken');
    localStorage.clear();
    return response;
  } catch (err) {
    throw err;
  }
});

export const fetchUserOrders = createAsyncThunk(
  'user/fetchUserOrders',
  async () => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (err) {
      throw err;
    }
  }
);

// Слайс пользователя
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    clearUserErrors: (state) => {
      state.error = null;
    },
    userLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось зарегистрироваться';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка авторизации';
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Не удалось получить данные пользователя';
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Не удалось обновить данные';
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка выхода';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.request = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.request = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.request = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      });
  }
});

// Селекторы
export const selectUserState = (state: RootState) => state.user;

export const { setAuthChecked, clearUserErrors, userLogout, setUser } =
  userSlice.actions;

export const { getUser, getIsAuthChecked, getUserLoading, getError } =
  userSlice.selectors;

export const userReducer = userSlice.reducer;
