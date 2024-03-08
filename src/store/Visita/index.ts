import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVisita } from "./types";

const initialState: IVisita = {
	nombre: "",
	desde: "",
	hasta: "",
	tipo: "",
	multiple_entrada: "",
	notificaciones: "",
	emailAutor: "",
	tipo_visita: "",
	uniqueID: "",
	seccion: "",
	num_int: "",
	residencial: "",
	calle: "",
	num_ext: "",
	colonia: "",
	ciudad: "",
	estado: "",
	cp: "",
};

const visitaSlice = createSlice({
	name: "visita",
	initialState,
	reducers: {
		setVisita(state, action: PayloadAction<IVisita>) {
			state = action.payload;
		},
	},
});

export const { setVisita } = visitaSlice.actions;
export default visitaSlice.reducer;
