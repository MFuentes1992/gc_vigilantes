import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { formStyles } from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";

type RadioCardProps = {
	label: string;
	id: string;
	selected: boolean;
	disabled?: boolean;
	icon: React.ReactNode;
	handleChange: (value: string) => void;
};

export const RadioCard = ({
	disabled,
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
					? [
							formStyles.radioButtonsContainer,
							{
								borderColor: disabled
									? app_colors.text_gray
									: app_colors.secondary,
							},
					  ]
					: formStyles.radioButtonsContainer2
			}>
			<View style={formStyles.descPosition}>
				{icon}
				<Text style={formStyles.text1}>{label}</Text>
			</View>
			<View style={formStyles.radioBtnPosition}>
				<View
					style={
						selected
							? [
									formStyles.radioButton,
									{
										borderColor: disabled
											? app_colors.ligth_bg
											: app_colors.secondary,
									},
							  ]
							: [formStyles.radioButton2]
					}>
					{selected && (
						<View
							style={[
								formStyles.radioButtonSelected,
								{
									backgroundColor: disabled
										? app_colors.ligth_bg
										: app_colors.secondary,
								},
							]}
						/>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};
RadioCard.defaultProps = {
	disabled: false,
};
