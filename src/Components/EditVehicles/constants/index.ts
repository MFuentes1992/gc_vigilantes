import { app_colors } from "@gcVigilantes/utils/default.colors";
import { TextStyle, ViewStyle } from "react-native";

export const ModalStyles: ViewStyle = {
	flex: 1,
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: app_colors.black,
};

export const defaultContainer: ViewStyle = {
	flex: 1,
	width: "100%",
	height: "100%",
	justifyContent: "center",
	backgroundColor: app_colors.ligth_bg,
};

export const headerContainer: ViewStyle = {
	flex: 1,
	flexDirection: "row",
	justifyContent: "flex-end",
	marginBottom: "10%",
};

export const inputStyles: TextStyle = {
	width: "95%",
	height: 50,
	borderColor: app_colors.ligth_bg,
	borderWidth: 1,
	marginBottom: "3%",
	paddingLeft: "2%",
	fontSize: 12,
	borderRadius: 5,
	color: app_colors.text_gray,
	margin: "auto",
};
