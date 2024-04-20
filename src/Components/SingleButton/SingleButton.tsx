import { app_colors } from "@gcVigilantes/utils/default.colors";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { button_container, button_styles } from "./constants";

type SingleButtonProps = {
	label: string;
	onPress: () => void;
};

export const SingleButton = ({ label, onPress }: SingleButtonProps) => {
	return (
		<View style={button_container}>
			<TouchableOpacity style={button_styles} onPress={onPress}>
				<Text style={{ color: app_colors.white }}>{label}</Text>
			</TouchableOpacity>
		</View>
	);
};
