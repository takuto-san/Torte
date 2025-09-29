import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodayWeekday } from '@/utils/date';

interface WeekdayState {
  selectedWeekday: string;
}

export const initialState: WeekdayState = {
  selectedWeekday: getTodayWeekday(),
};

const weekdaySlice = createSlice({
  name: 'weekday',
  initialState,
  reducers: {
    setSelectedWeekday(state, action: PayloadAction<string>) {
      state.selectedWeekday = action.payload;
    },
  },
});

export const { setSelectedWeekday } = weekdaySlice.actions;
export default weekdaySlice.reducer;