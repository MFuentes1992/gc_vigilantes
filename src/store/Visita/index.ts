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
			state.calle = action.payload.calle;
			state.ciudad = action.payload.ciudad;
			state.colonia = action.payload.colonia;
			state.cp = action.payload.cp;
			state.desde = action.payload.desde;
			state.emailAutor = action.payload.emailAutor;
			state.estado = action.payload.estado;
			state.hasta = action.payload.hasta;
			state.multiple_entrada = action.payload.multiple_entrada;
			state.nombre = action.payload.nombre;
			state.notificaciones = action.payload.notificaciones;
			state.num_ext = action.payload.num_ext;
			state.num_int = action.payload.num_int;
			state.residencial = action.payload.residencial;
			state.seccion = action.payload.seccion;
			state.tipo = action.payload.tipo;
			state.tipo_visita = action.payload.tipo_visita;
			state.uniqueID = action.payload.uniqueID;
		},
	},
});

export const { setVisita } = visitaSlice.actions;
export default visitaSlice.reducer;
