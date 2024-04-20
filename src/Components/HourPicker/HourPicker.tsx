import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

type HourPickerProps = {
	totalHours: number;
	step?: number;
	currValue: number;
	handleChange: (_v: number) => void;
};

export const HourPicker = ({
	totalHours,
	currValue,
	step,
	handleChange,
}: HourPickerProps) => {
	const [current, setCurrValue] = React.useState<number>(currValue);

	const onChange = (value: number) => {
		setCurrValue(value);
		handleChange(value);
	};

	return (
		<View>
			<Picker selectedValue={current} onValueChange={onChange}>
				{new Array(totalHours / (step ?? 1)).fill(0).map((_, index) => (
					<Picker.Item
						key={index}
						label={`${index + 1 < 10 ? "0" : ""}${(index + 1) * (step ?? 1)}`}
						value={(index + 1) * (step ?? 1)}
					/>
				))}
			</Picker>
		</View>
	);
};

HourPicker.defaultProps = {
	step: 1,
};
