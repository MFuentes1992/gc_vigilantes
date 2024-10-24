import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Logs } from "./types";

const initialState: Logs = {
  logs: [],
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs(state, action: PayloadAction<Logs>) {
      state.logs = action.payload.logs;
    },
  },
});

export const { setLogs } = logsSlice.actions;
export default logsSlice.reducer;
