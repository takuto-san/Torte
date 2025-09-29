import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabState {
  currentTab: number;
}

export const initialState: TabState = {
  currentTab: 1,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setCurrentTab(state, action: PayloadAction<number>) {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabSlice.actions;      
export default tabSlice.reducer;