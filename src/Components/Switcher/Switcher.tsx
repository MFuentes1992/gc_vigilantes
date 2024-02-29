import React, { useEffect } from "react";
import { View, Text, Switch } from "react-native";
import { TSwitcher } from "./constants";

export const Switcher = ({ title, value, handleOnChange }: TSwitcher) => {
	const [switchValue, setSwitchValue] = React.useState(value);
	useEffect(() => {
		setSwitchValue(value);
	}, [value]);
	return (
		<View
			style={{
				flex: 1,
				flexDirection: "row",
				alignItems: "center",
			}}>
			<Text style={{ fontSize: 12, color: "gray", marginRight: "2%" }}>
				{title}
			</Text>
			<Switch
				trackColor={{ false: "lightgray", true: "#32CD32" }}
				thumbColor='#FFF'
				ios_backgroundColor='#3e3e3e'
				onValueChange={handleOnChange}
				value={switchValue}
			/>
		</View>
	);
};
