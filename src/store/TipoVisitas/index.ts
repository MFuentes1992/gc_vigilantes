import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoVisita } from "./types";

const initialState: { catalogVisitas: TipoVisita[] } = {
	catalogVisitas: [],
};

const tipoVisitasSlice = createSlice({
	name: "tipoVisitas",
	initialState,
	reducers: {
		setTipoVisita(state, action: PayloadAction<TipoVisita[]>) {
			state.catalogVisitas = action.payload;
		},
	},
});

export const { setTipoVisita } = tipoVisitasSlice.actions;
export default tipoVisitasSlice.reducer;
