import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  dbSelected: "",
  isConnected: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setDbSelected: (state, action: PayloadAction<string>) => {
      state.dbSelected = action.payload;
    },
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setDbSelected, setIsLogged } = authSlice.actions;
export default authSlice.reducer;
