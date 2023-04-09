import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filters from './slices/filterSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: { filters, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;
