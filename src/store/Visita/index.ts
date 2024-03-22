import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVisita, VehiclesResType } from "./types";

const initialState: IVisita = {
	nombre: "",
	desde: "",
	hasta: "",
	tipo_ingreso: "",
	tipoIngresoText: "",
	multiple_entrada: "",
	notificaciones: "",
	nameAutor: "",
	emailAutor: "",
	tipo_visita: "",
	tipoVisitaText: "",
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
	vehicles: [],
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
			state.nameAutor = action.payload.nameAutor;
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
			state.tipo_visita = action.payload.tipo_visita;
			state.tipo_ingreso = action.payload.tipo_ingreso;
			state.tipoIngresoText = action.payload.tipoIngresoText;
			state.tipoVisitaText = action.payload.tipoVisitaText;
			state.uniqueID = action.payload.uniqueID;
		},
		setVehicles(state, action: PayloadAction<VehiclesResType[]>) {
			state.vehicles = action.payload;
		},
	},
});

export const { setVisita, setVehicles } = visitaSlice.actions;
export default visitaSlice.reducer;
