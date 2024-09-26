import { ROUTES } from "@gcVigilantes/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: ROUTES.ACTIVATION_CODE,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setScreen(state, action: PayloadAction<string>) {
      state.screen = action.payload;
    },
  },
});

export const { setScreen } = paginationSlice.actions;
export default paginationSlice.reducer;
