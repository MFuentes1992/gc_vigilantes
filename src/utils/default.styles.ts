import { TextStyle } from "react-native";
import { app_colors } from "./default.colors";

export const app_text_title: TextStyle = {
	fontSize: 16,
	fontWeight: "bold",
	color: app_colors.text_dark,
	marginBottom: 3,
	textAlign: "justify",
};

export const app_text_property: TextStyle = {
	fontSize: 12,
	fontWeight: "normal",
	color: app_colors.text_gray,
	marginBottom: 3,
};

export const app_text_body: TextStyle = {
	fontSize: 12,
	fontWeight: "normal",
	color: app_colors.text_dark,
	marginBottom: 3,
	marginRight: 5,
};

export const app_text_menu: TextStyle = {
	fontSize: 10,
	fontWeight: "normal",
	marginBottom: 3,
};
