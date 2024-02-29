import { app_colors } from "@gcVigilantes/utils/default.colors";
import { TextStyle, ViewStyle } from "react-native";

export type VisitaDetailsProps = {
	uri: string;
	autor: string;
	estatus: string;
	direccion: string;
};

export const details_container: ViewStyle = {
	flex: 1,
	flexDirection: "row",
	justifyContent: "space-between",
	width: "100%",
	height: "20%",
	backgroundColor: app_colors.white,
	padding: "5%",
	borderBottomColor: app_colors.text_gray,
	borderBottomWidth: 0.5,
};

export const details_info: ViewStyle = {
	flex: 1,
	width: "80%",
	paddingLeft: "2%",
};

export const details_badge: ViewStyle = {
	width: "25%",
	padding: "1%",
	backgroundColor: app_colors.secondary_badge,
	justifyContent: "center",
	alignItems: "center",
};

export const details_badge_text: TextStyle = {
	color: app_colors.white,
};
