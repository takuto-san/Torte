import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading(state) {
      state.isLoading = true;
    },
    unsetLoading(state) {
      state.isLoading = false;
    }
  },
});

export const { setLoading, unsetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;