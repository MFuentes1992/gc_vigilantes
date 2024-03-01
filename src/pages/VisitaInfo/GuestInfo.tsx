import React from "react";
import { View } from "react-native";
import { card_styles } from "./constants";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { GuestPicker } from "@gcVigilantes/Components/GuestPicker/GuestPicker";

export const GuestInfo = () => {
	return (
		<View style={card_styles}>
			<CardTitle title='Agregar acompanantes' uppercase />
			<GuestPicker />
		</View>
	);
};
