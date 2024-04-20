import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RadioCard from "@gcVigilantes/Components/RadioCard";

type RadioGroupProps = {
	options: {
		id: string;
		label: string;
		icon: React.ReactNode;
	}[];
	disabled?: boolean;
	selectedValue?: string;
	orientation?: "horizontal" | "vertical";
	handleChange: (value: string) => void;
};

export const RadioGroup = (props: RadioGroupProps) => {
	return (
		<View
			style={{
				flexDirection: props.orientation === "horizontal" ? "row" : "column",
				flex: 1,
				justifyContent: "space-between",
				width: "90%",
				margin: "auto",
			}}>
			{props.options.map((option) => (
				<RadioCard
					key={option.id}
					label={option.label}
					id={option.id}
					disabled={props.disabled}
					icon={option.icon}
					selected={props.selectedValue === option.id}
					handleChange={() => {
						if (!props.disabled) {
							props.handleChange(option.id);
						}
					}}
				/>
			))}
		</View>
	);
};

RadioGroup.defaultProps = {
	orientation: "horizontal",
	selectedValue: "",
	disabled: false,
};
