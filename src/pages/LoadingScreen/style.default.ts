import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export const LoadingScreenStyles: ViewStyle = {
	flex: 0.3,
	width: "50%",
	height: "50%",
	margin: "auto",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: app_colors.white,
	borderRadius: 10,
	elevation: 20,
};
