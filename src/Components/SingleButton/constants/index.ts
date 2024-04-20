import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ViewStyle } from "react-native";

export const button_container: ViewStyle = {
	flexDirection: "row",
	justifyContent: "space-around",
	padding: "5%",
	backgroundColor: app_colors.white,
};

export const button_styles: ViewStyle = {
	backgroundColor: app_colors.secondary,
	padding: 10,
	borderRadius: 5,
	width: "40%",
	maxHeight: 40,
	alignItems: "center",
	marginBottom: 10,
};
