import React from "react";
import { TextInput, View } from "react-native";

export type TVehicleInfo = {
	handleData: (data: { [key: string]: string }) => void;
};

export const VehicleInfo = ({ handleData }: TVehicleInfo) => {
	return (
		<View
			style={{
				flex: 0.2,
				alignItems: "center",
				backgroundColor: "#dddddd",
				width: "95%",
				marginBottom: "5%",
				borderRadius: 5,
				paddingTop: "2%",
				paddingBottom: "5%",
			}}>
			<TextInput
				style={{
					width: "80%",
					height: 40,
					borderBottomColor: "gray",
					borderBottomWidth: 1,
				}}
				onFocus={() => {}}
				onBlur={() => {}}
				onChangeText={(text) => handleData({ vehicle_model: text })}
				autoCapitalize='none'
				maxLength={50}
				placeholder='Modelo del Vehiculo'
			/>
			<TextInput
				style={{
					width: "80%",
					height: 40,
					borderBottomColor: "gray",
					borderBottomWidth: 1,
				}}
				onFocus={() => {}}
				onBlur={() => {}}
				onChangeText={(text) => handleData({ vehicle_color: text })}
				autoCapitalize='none'
				maxLength={50}
				placeholder='Color vehiculo'
			/>
			<TextInput
				style={{
					width: "80%",
					height: 40,
					borderBottomColor: "gray",
					borderBottomWidth: 1,
				}}
				onFocus={() => {}}
				onBlur={() => {}}
				onChangeText={(text) => handleData({ vehicle_plate: text })}
				autoCapitalize='none'
				maxLength={50}
				placeholder='Placas'
			/>
		</View>
	);
};
