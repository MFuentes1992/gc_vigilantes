import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	access_token: "",
	name: "",
	residence: "",
	id: "",
};

export const userDataSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<typeof initialState>) => {
			state = action.payload;
		},
		logout: (state) => {
			state = initialState;
		},
	},
});
export const { setUserData, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
