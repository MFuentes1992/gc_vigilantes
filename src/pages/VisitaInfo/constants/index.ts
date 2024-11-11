import { TTipoIngreso } from "@gcVigilantes/store/TipoIngreso/types";
import { TipoVisita } from "@gcVigilantes/store/TipoVisitas/types";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export const TABS = {
  MAIN: "main",
  VEHICLES: "vehicles",
  DATE: "date",
  GUEST: "guest",
  SETTINGS: "settings",
};

export const TIPO_INGRESO = {
  VEHICULO: { label: "Vehículo", id: "1" },
  PEATONAL: { label: "Peatonal", id: "2" },
};

export const SWITCHER_VALUES = {
  TRUE: "1",
  FALSE: "0",
};

export const NEW_VEHICLE = {
  conductor: "",
  marca: "",
  modelo: "",
  anio: "",
  color: "",
  placas: "",
};

export type VisitaInfoProps = {
  nombre: string;
  desde: string;
  hasta: string;
  tipo: string;
  multiple_entrada: string;
  notificaciones: string;
  emailAutor: string;
  tipo_visita: string;
  uniqueID: string;
  seccion: string;
  num_int: string;
  residencial: string;
  calle: string;
  num_ext: string;
  colonia: string;
  ciudad: string;
  estado: string;
  cp: string;
  estatus: number;
};

export type MainInfoProps = {
  catalogVisitas: TipoVisita[];
  catalogIngreso: TTipoIngreso[];
  tipoVisita: string;
  tipoIngreso: string;
  nombreVisita: string;
  visitVehicles: VehiclesResType[];
  estatus: number;
  newVisita: boolean;
  handleOnChange: (key: string, value: string) => void;
};

export type DateInfoProps = {
  fechaIngreso: string;
  fechaSalida: string;
  horaIngreso: string;
  horaSalida: string;
  estatus: number;
  dateTypeInput: number;
  edit: boolean;
  handleOnChange: (key: string, value: string | number) => void;
};

export type GuestInfoProps = {
  estatus: number;
};

export type settingsInfoProps = {
  autor: string;
  uniqueID: string;
  residencial: string;
  seccion: string;
  calle: string;
  num_ext: string;
  num_int: string;
  colonia: string;
  ciudad: string;
  estado: string;
  cp: string;
  notificaciones: boolean;
  multiple_entrada: boolean;
  handleOnchange: (key: string, value: string) => void;
};

export const card_styles: ViewStyle = {
  margin: "5%",
  flex: 0.16,
  justifyContent: "center",
  backgroundColor: app_colors.white,
  padding: "2%",
  borderColor: app_colors.ligth_bg,
  borderWidth: 0.5,
};

export const card_styles_extended: ViewStyle = {
  position: "relative",
  width: "100%",
};

export const mainInfoVehicleScrollStyles: ViewStyle = {
  width: "100%",
  zIndex: 1,
  marginBottom: 0,
};

export const getVehicleInfoStyles = (vehicles: any[]): ViewStyle => {
  return {
    padding: "5%",
    width: vehicles.length * 220,
    justifyContent: vehicles.length > 1 ? "space-around" : "center",
  };
};

export const DATE_TYPES = {
  START: 1,
  END: 2,
};
