import { TTipoIngreso } from "@gcVigilantes/store/TipoIngreso/types";
import { TipoVisita } from "@gcVigilantes/store/TipoVisitas/types";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export const TABS = {
	MAIN: "main",
	DATE: "date",
	GUEST: "guest",
	SETTINGS: "settings",
};

export const TIPO_INGRESO = {
	VEHICULO: { label: "Vehículo", id: "1" },
	PEATONAL: { label: "Peatonal", id: "2" },
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
};

export type MainInfoProps = {
	catalogVisitas: TipoVisita[];
	catalogIngreso: TTipoIngreso[];
	tipoVisita: string;
	tipoIngreso: string;
	nombreVisita: string;
};

export type DateInfoProps = {
	fromDate?: string;
	toDate?: string;
	dateType?: string;
	fromHour?: number;
	toHour?: number;
	hourType?: string;
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

export const mainInfoVehicleScrollStyles: ViewStyle = {
	width: "100%",
	height: 220,
	top: -110,
	zIndex: 1,
	marginBottom: 0,
};

export const getVehicleInfoStyles = (vehicles: any[]): ViewStyle => {
	return {
		top: 0,
		width: vehicles.length * 200,
		justifyContent: "space-around",
	};
};
