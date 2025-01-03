import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVisita, VehiclesResType } from "./types";

const initialState: IVisita = {
  visitaId: "",
  idTipoVisita: "",
  idTipoIngreso: "",
  idUsuario: "",
  fechaIngreso: "",
  fechaSalida: "",
  multiple: "",
  notificaciones: "",
  appGenerado: "",
  vigenciaQR: "",
  uniqueId: "",
  autor: "",
  emailAutor: "",
  residencialSeccion: "",
  residencialNumInterior: "",
  residencialNumExterior: "",
  residencialCalle: "",
  residencialColonia: "",
  residencialCiudad: null,
  residencialEstado: "",
  residencialCP: "",
  residencialNombre: "",
  nombre: "",
  estatusVisita: "Activa",
  vehicles: [],
  pedestrians: [],
};

const visitaSlice = createSlice({
  name: "visita",
  initialState,
  reducers: {
    setVisita(state, action: PayloadAction<IVisita>) {
      state.visitaId = action.payload.visitaId;
      state.residencialCalle = action.payload.residencialCalle;
      state.residencialCiudad = action.payload.residencialCiudad;
      state.residencialColonia = action.payload.residencialColonia;
      state.residencialCP = action.payload.residencialCP;
      state.fechaIngreso = action.payload.fechaIngreso;
      state.autor = action.payload.autor;
      state.emailAutor = action.payload.emailAutor;
      state.residencialEstado = action.payload.residencialEstado;
      state.fechaSalida = action.payload.fechaSalida;
      state.multiple = action.payload.multiple;
      state.nombre = action.payload.nombre;
      state.notificaciones = action.payload.notificaciones;
      state.residencialNumExterior = action.payload.residencialNumExterior;
      state.residencialNumInterior = action.payload.residencialNumInterior;
      state.residencialNombre = action.payload.residencialNombre;
      state.residencialSeccion = action.payload.residencialSeccion;
      state.idTipoVisita = action.payload.idTipoVisita;
      state.idTipoIngreso = action.payload.idTipoIngreso;
      state.vigenciaQR = action.payload.vigenciaQR;
      state.appGenerado = action.payload.appGenerado;
      state.uniqueId = action.payload.uniqueId;
      state.vehicles = action.payload.vehicles;
      state.pedestrians = action.payload.pedestrians;
      state.estatusVisita = action.payload.estatusVisita;
    },
    setVehicles(state, action: PayloadAction<VehiclesResType[]>) {
      state.vehicles = action.payload;
    },
    clearVisita(state) {
      state.visitaId = "";
      state.residencialCalle = "";
      state.residencialCiudad = null;
      state.residencialColonia = "";
      state.residencialCP = "";
      state.fechaIngreso = "";
      state.autor = "";
      state.emailAutor = "";
      state.residencialEstado = "";
      state.fechaSalida = "";
      state.multiple = "";
      state.nombre = "";
      state.notificaciones = "";
      state.residencialNumExterior = "";
      state.residencialNumInterior = "";
      state.residencialNombre = "";
      state.residencialSeccion = "";
      state.idTipoVisita = "";
      state.idTipoIngreso = "";
      state.vigenciaQR = "";
      state.appGenerado = "";
      state.uniqueId = "";
      state.vehicles = [];
      state.pedestrians = [];
      state.estatusVisita = "Activa";
    },
  },
});

export const { setVisita, setVehicles, clearVisita } = visitaSlice.actions;
export default visitaSlice.reducer;
