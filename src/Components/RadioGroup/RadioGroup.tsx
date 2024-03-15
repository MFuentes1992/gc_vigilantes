import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RadioCard from "@gcVigilantes/Components/RadioCard";

type RadioGroupProps = {
	options: {
		id: string;
		label: string;
		icon: React.ReactNode;
	}[];
	selectedValue?: string;
	orientation?: "horizontal" | "vertical";
	handleChange: (value: string) => void;
};

export const RadioGroup = (props: RadioGroupProps) => {
	const [selectedOption, setSelectedOption] = React.useState(
		props.selectedValue
	);
	console.log("passed to radio group", props.selectedValue);
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
					icon={option.icon}
					selected={selectedOption === option.id}
					handleChange={() => {
						setSelectedOption(option.id);
						props.handleChange(option.id);
					}}
				/>
			))}
		</View>
	);
};

RadioGroup.defaultProps = {
	orientation: "horizontal",
	selectedValue: "",
};
