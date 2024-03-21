import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export type VehicleCardProp = {
	vehicle: {
		marca: string;
		modelo: string;
		color: string;
		anio: string;
		placas: string;
	};
};

export const vehicleCardStyles: ViewStyle = {
	width: 180,
	padding: 10,
	borderRadius: 10,
	backgroundColor: app_colors.white,
	alignContent: "center",
	alignItems: "center",
	elevation: 7,
	top: 0,
};

export const vehicleCardEditStyles: ViewStyle = {
	flexDirection: "row",
	width: "100%",
	justifyContent: "space-between",
	alignItems: "flex-end",
	marginBottom: 10,
};

export const vehicleImageStyles: ViewStyle = {
	width: "30%",
	padding: "5%",
	borderRightWidth: 1,
	borderRightColor: app_colors.ligth_bg,
};
