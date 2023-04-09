import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortOption: { name: 'популярности', parameter: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      action.payload.sortOption && (state.sortOption = action.payload.sortOption);
    },
  },
});

export const selectFilter = (state: RootState) => state.filters;

export const { setCategoryId, setSortOption, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
