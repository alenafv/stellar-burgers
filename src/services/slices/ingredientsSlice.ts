import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// Типы состояния
interface IngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

// Асинхронный thunk для загрузки ингредиентов
export const fetchIngredientsData = createAsyncThunk<TIngredient[], void>(
  'ingredients/fetchIngredientsData',
  async () => await getIngredientsApi()
);

// Слайс для ингредиентов
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsData.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  }
});

// Селекторы
export const { getIngredients, getIngredientsLoading } =
  ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
