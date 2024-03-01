import { TTipoIngreso } from "@gcVigilantes/store/TipoIngreso/types";
import { TipoVisita } from "@gcVigilantes/store/TipoVisitas/types";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export const TABS = {
	MAIN: "main",
	DATE: "date",
	GUEST: "guest",
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
