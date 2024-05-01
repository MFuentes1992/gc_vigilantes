import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
	},
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;
