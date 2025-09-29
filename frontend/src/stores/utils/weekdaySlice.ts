import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodayWeekday } from "@/utils/date";
import type { Weekday } from "@/types/dateTypes";

interface WeekdayState {
  selectedWeekday: Weekday;
}

export const initialState: WeekdayState = {
  selectedWeekday: getTodayWeekday(),
};

const weekdaySlice = createSlice({
  name: "weekday",
  initialState,
  reducers: {
    setSelectedWeekday(state, action: PayloadAction<Weekday>) {
      state.selectedWeekday = action.payload;
    },
  },
});

export const { setSelectedWeekday } = weekdaySlice.actions;
export default weekdaySlice.reducer;
