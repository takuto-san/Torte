import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type SelectedFoodState = {
  ids: number[];
};

const initialState: SelectedFoodState = {
  ids: [],
};

const selectedFoodSlice = createSlice({
  name: "selectedFood",
  initialState,
  reducers: {
    selectFood: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (!state.ids.includes(id)) state.ids.push(id);
    },

    unselectFood: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.ids = state.ids.filter((x) => x !== id);
    },
  },
});

export const {
  selectFood,
  unselectFood,
} = selectedFoodSlice.actions;

export default selectedFoodSlice.reducer;