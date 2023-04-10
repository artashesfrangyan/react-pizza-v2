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

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: CartItemProps[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading || success || error
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
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<any>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
