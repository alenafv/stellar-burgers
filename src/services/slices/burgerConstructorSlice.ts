import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '../store';

// Типы состояния
interface BurgerConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: string | null;
}

// Начальное состояние
export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

// Асинхронный thunk для отправки заказа
export const placeOrder = createAsyncThunk(
  'burger/placeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

const reorderIngredients = (
  ingredients: TConstructorIngredient[],
  from: number,
  to: number
) => {
  const newIngredients = [...ingredients];
  const [movedIngredient] = newIngredients.splice(from, 1);
  newIngredients.splice(to, 0, movedIngredient);
  return newIngredients;
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveItemUp: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index > 0) {
        state.ingredients = reorderIngredients(
          state.ingredients,
          index,
          index - 1
        );
      }
    },
    moveItemDown: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index < state.ingredients.length - 1) {
        state.ingredients = reorderIngredients(
          state.ingredients,
          index,
          index + 1
        );
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

// Селекторы
export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

export const getOrderRequest = (state: RootState) =>
  selectBurgerConstructor(state).orderRequest;
export const getOrderModalData = (state: RootState) =>
  selectBurgerConstructor(state).orderModalData;

export const {
  addItem,
  removeItem,
  moveItemUp,
  moveItemDown,
  clearConstructor
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
