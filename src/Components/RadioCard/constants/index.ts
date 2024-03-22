import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
	row: {
		flexDirection: "row",
		flex: 0.16,
		marginBottom: "3%",
		alignItems: "center",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "lightgray",
	},
	radioButtonsContainer: {
		flexDirection: "row",
		marginHorizontal: 4,
		width: 100,
		height: 100,
		borderRadius: 5,
		marginVertical: 3,
		margin: "2%",
		borderWidth: 1,
	},
	radioButton: {
		height: 15,
		width: 15,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	radioButton2: {
		height: 15,
		width: 15,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "gray",
		alignItems: "center",
		justifyContent: "center",
	},
	radioButtonSelected: {
		height: 10,
		width: 10,
		borderRadius: 6,
	},
	radioBtnPosition: {
		//ajustar al lado derecho
		position: "absolute",
		right: 5,
		top: 5,
	},
	descPosition: {
		//ajustar elementos al centro
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
	},
	radioButtonsContainer2: {
		flexDirection: "row",
		marginHorizontal: 4,
		width: 100,
		height: 100,
		borderRadius: 5,
		marginVertical: 3,
	},
	text2: {
		fontSize: 12,
		color: app_colors.text_gray,
	},
	text1: {
		fontSize: 12,
		color: app_colors.text_gray,
	},
	name: {
		fontSize: 12,
		borderBottomWidth: 0.9,
		borderBottomColor: "black",
		width: "95%",
	},
	nameContainer: {
		width: "90%",
		height: "5.5%",
		marginTop: "5%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
	schedule: {
		marginTop: "5%",
		width: "80%",
		alignItems: "center",
		justifyContent: "center",
	},
	columnContainer: {
		flexDirection: "column",
		paddingHorizontal: 5,
	},
	date: {
		borderBottomWidth: 0.9,
		borderBottomColor: "black",
	},
	accessTypeContainer: {
		marginTop: "5%",
	},
});

export const formatDateToPayload = (date: string, hour: string) => {
	const resDate = date.split("T")[0];
	const payload = `${resDate}T${hour}:00:00`;
	return payload;
};
