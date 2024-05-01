import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAlerts } from "./types";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";

const initialState: TAlerts = {
	showAlert: false,
	title: "",
	message: "",
	type: ALERT_TYPES.SUCCESS,
};

const alertsSlice = createSlice({
	name: "alerts",
	initialState,
	reducers: {
		setShowAlert(state, action: PayloadAction<TAlerts>) {
			state.showAlert = action.payload.showAlert;
			state.title = action.payload.title;
			state.message = action.payload.message;
			state.type = action.payload.type;
		},
	},
});

export const { setShowAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
