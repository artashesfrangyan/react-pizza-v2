import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortProps } from '../../types/SortProps';

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortOption: SortProps;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortOption: { name: 'популярности', parameter: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortOption(state, action: PayloadAction<SortProps>) {
      state.sortOption = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sortOption = action.payload.sortOption;
    },
  },
});

export const selectFilter = (state: RootState) => state.filters;

export const { setCategoryId, setSortOption, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
