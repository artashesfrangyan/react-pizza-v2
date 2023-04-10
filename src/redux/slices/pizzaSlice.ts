import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItemProps } from '../../types/CartItemProps';
import { ItemProps } from '../../types/ItemProps';

export const fetchItems = createAsyncThunk<ItemProps[], string>(
  'pizza/fetchByIdStatus',
  async (url) => {
    const { data } = await axios.get(url);
    return data;
  },
);

interface PizzaSliceState {
  items: CartItemProps[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: 'loading', // loading || success || error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<any>) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
