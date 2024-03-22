import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTipoIngreso } from "./types";

const initialState: { catalogIngreso: TTipoIngreso[] } = {
	catalogIngreso: [],
};

const tipoIngresoSlice = createSlice({
	name: "tipoIngreso",
	initialState,
	reducers: {
		setCatalogIngreso: (state, action: PayloadAction<TTipoIngreso[]>) => {
			state.catalogIngreso = action.payload;
		},
	},
});

export const { setCatalogIngreso } = tipoIngresoSlice.actions;
export default tipoIngresoSlice.reducer;
