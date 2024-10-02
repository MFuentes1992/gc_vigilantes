import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVisita, VehiclesResType } from "./types";

const initialState: IVisita = {
  visita_id: "",
  nombre: "",
  desde: "",
  hasta: "",
  id_tipo_ingreso: "",
  tipoIngresoText: "",
  multiple_entrada: "",
  notificaciones: "",
  nameAutor: "",
  emailAutor: "",
  id_tipo_visita: "",
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
  estatus_registro: "",
  vehicles: [],
};

const visitaSlice = createSlice({
  name: "visita",
  initialState,
  reducers: {
    setVisita(state, action: PayloadAction<IVisita>) {
      state.visita_id = action.payload.visita_id;
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
      state.tipo_visita = action.payload.id_tipo_visita;
      state.tipo_ingreso = action.payload.tipo_ingreso;
      state.tipoIngresoText = action.payload.tipoIngresoText;
      state.tipoVisitaText = action.payload.tipoVisitaText;
      state.uniqueID = action.payload.uniqueID;
      state.vehicles = action.payload.vehicles;
      state.estatus_registro = action.payload.estatus_registro;
    },
    setVehicles(state, action: PayloadAction<VehiclesResType[]>) {
      state.vehicles = action.payload;
    },
    clearVisita(state) {
      state.visita_id = "";
      state.calle = "";
      state.ciudad = "";
      state.colonia = "";
      state.cp = "";
      state.desde = "";
      state.nameAutor = "";
      state.emailAutor = "";
      state.estado = "";
      state.hasta = "";
      state.multiple_entrada = "";
      state.nombre = "";
      state.notificaciones = "";
      state.num_ext = "";
      state.num_int = "";
      state.residencial = "";
      state.seccion = "";
      state.tipo_visita = "";
      state.tipo_ingreso = "";
      state.tipoIngresoText = "";
      state.tipoVisitaText = "";
      state.uniqueID = "";
      state.vehicles = [];
    },
  },
});

export const { setVisita, setVehicles, clearVisita } = visitaSlice.actions;
export default visitaSlice.reducer;
