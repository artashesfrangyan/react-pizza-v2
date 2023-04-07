import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: '',
  currentPage: 1,
  sortOption: { name: 'популярности', parameter: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
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

export const selectFilter = (state) => state.filters;

export const { setCategoryId, setSortOption, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
