import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LogItem, Logs } from "./types";

const initialState: Logs = {
  logs: [],
};

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs(state, action: PayloadAction<LogItem[]>) {
      state.logs = action.payload;
    },
  },
});

export const { setLogs } = logsSlice.actions;
export default logsSlice.reducer;
