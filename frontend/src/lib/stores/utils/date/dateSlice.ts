import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTodayDate } from '@/utils/dateUtils';
import { DateObj, DateState } from '@/types/dateTypes';

const initialState: DateState = {
  selectedDate: getTodayDate(),
};

function dateObjToDate(d: DateObj): Date {
  return new Date(d.year, d.month - 1, d.day);
}

function dateToDateObj(date: Date): DateObj {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<DateObj>) => {
      state.selectedDate = action.payload;
    },
    incrementDay: (state) => {
      const date = dateObjToDate(state.selectedDate);
      date.setDate(date.getDate() + 1);
      state.selectedDate = dateToDateObj(date);
    },
    decrementDay: (state) => {
      const date = dateObjToDate(state.selectedDate);
      date.setDate(date.getDate() - 1);
      state.selectedDate = dateToDateObj(date);
    },
  },
});

export const { setDate, incrementDay, decrementDay } = dateSlice.actions;
export default dateSlice.reducer;