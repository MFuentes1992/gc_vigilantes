import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export const ALERT_TYPES: { [key: string]: "success" | "error" } = {
	SUCCESS: "success",
	ERROR: "error",
};

export const AlertContainerStyles: ViewStyle = {
	flexDirection: "column",
	justifyContent: "space-around",
	width: "80%",
	height: "20%",
	borderRadius: 10,
	elevation: 5,
	backgroundColor: app_colors.white,
};

export const AlertBodyStyles: ViewStyle = {
	width: "100%",
	display: "flex",
	height: "70%",
	flexDirection: "row",
	justifyContent: "center",
	alignItems: "center",
};

export const AlertTextStyles: ViewStyle = {
	flex: 0.6,
	justifyContent: "center",
	alignItems: "center",
};

export const HeaderStyles: ViewStyle = {
	display: "flex",
	flexDirection: "row",
	width: "100%",
	height: 50,
	padding: 10,
};
