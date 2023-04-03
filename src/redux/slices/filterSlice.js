import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortOption:  { name: 'популярности', parameter: 'rating' },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
        state.categoryId = action.payload 
    },
    setSortOption(state, action) {
        state.sortOption = action.payload 
    }
  },
});

export const { setCategoryId, setSortOption } = filterSlice.actions;

export default filterSlice.reducer;
