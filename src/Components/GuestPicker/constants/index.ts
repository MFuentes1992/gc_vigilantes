import { StyleSheet } from "react-native";

export type TGuestPicker = {
	fulName: string;
};

export const guestpicker_contaier: any = {
	flex: 1,
	backgroundColor: "#dddddd",
	justifyContent: "space-around",
	padding: 20,
};

export const add_guest: any = {
	width: "15%",
	backgroundColor: "white",
	boxShadow: "5px 5px 5px 5px rgba(0,0,0,0.75)",
	borderRadius: 5,
	alignItems: "center",
	justifyContent: "center",
	padding: 5,
};

export const guest_input_container: any = {
	flex: 1,
	width: "90%",
};

export const guest_row: any = {
	flexDirection: "row",
	justifyContent: "space-between",
};

export const guest_input: any = {
	width: "90%",
	height: 40,
	borderBottomColor: "gray",
	borderBottomWidth: 1,
};
