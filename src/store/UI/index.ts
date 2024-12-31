import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  innerSpinner: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setInnerSpinner(state, action: PayloadAction<boolean>) {
      state.innerSpinner = action.payload;
    },
  },
});

export const { setLoading, setInnerSpinner } = uiSlice.actions;
export default uiSlice.reducer;
