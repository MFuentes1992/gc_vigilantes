import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { formStyles } from "./constants";

type RadioCardProps = {
	label: string;
	id: string;
	selected: boolean;
	icon: React.ReactNode;
	handleChange: (value: string) => void;
};

export const RadioCard = ({
	label,
	icon,
	id,
	selected,
	handleChange,
}: RadioCardProps) => {
	return (
		<TouchableOpacity
			onPress={() => handleChange(id)}
			style={
				selected
					? [formStyles.radioButtonsContainer, ,]
					: formStyles.radioButtonsContainer2
			}>
			<View style={formStyles.descPosition}>
				{icon}
				<Text style={selected ? formStyles.text1 : formStyles.text2}>
					{label}
				</Text>
			</View>
			<View style={formStyles.radioBtnPosition}>
				<View
					style={selected ? formStyles.radioButton : formStyles.radioButton2}>
					{selected && <View style={formStyles.radioButtonSelected} />}
				</View>
			</View>
		</TouchableOpacity>
	);
};
