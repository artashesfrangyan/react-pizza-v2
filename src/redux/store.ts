import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import filters from './slices/filterSlice';
import pizza from './slices/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filters, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
