import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAlerts } from "./types";

const initialState: TAlerts = {
	showAlert: false,
	title: "",
	message: "",
};

const alertsSlice = createSlice({
	name: "alerts",
	initialState,
	reducers: {
		setShowAlert(state, action: PayloadAction<TAlerts>) {
			state.showAlert = action.payload.showAlert;
			state.title = action.payload.title;
			state.message = action.payload.message;
		},
	},
});

export const { setShowAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
