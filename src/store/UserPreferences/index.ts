import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPreferences } from "./types";

const initialState: IPreferences = {
	theme: "light",
	language: "es",
	notifications: true,
};

const userPreferencesSlice = createSlice({
	name: "userPreferences",
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<string>) {
			state.theme = action.payload;
		},
		setLanguage(state, action: PayloadAction<string>) {
			state.language = action.payload;
		},
		setNotifications(state, action: PayloadAction<boolean>) {
			state.notifications = action.payload;
		},
	},
});

export const { setTheme, setLanguage, setNotifications } =
	userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
