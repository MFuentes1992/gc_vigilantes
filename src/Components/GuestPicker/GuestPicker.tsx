import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
	TGuestPicker,
	add_guest,
	guest_input,
	guest_input_container,
	guest_row,
	guestpicker_contaier,
} from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const GuestPicker = ({
	guests,
	handlePicker,
}: {
	guests?: TGuestPicker[];
	handlePicker?: (_i: number, _v: string) => void;
}) => {
	const [guestForm, setGuestForm] = useState<TGuestPicker[]>(guests || []);
	const handleTextChange = (index: number, value: string) => {
		const newGuestForm = [...guestForm];
		newGuestForm[index].fulName = value;
		setGuestForm(newGuestForm);
		if (handlePicker) handlePicker(index, value);
	};

	const handleAddGuest = () => {
		const newGuestForm = [...guestForm];
		newGuestForm.push({ fulName: "" });
		setGuestForm(newGuestForm);
	};

	const handleRemoveGuest = (index: number) => {
		const newGuestForm = [...guestForm];
		newGuestForm.splice(index, 1);
		setGuestForm(newGuestForm);
	};

	return (
		<View style={guestpicker_contaier}>
			<TouchableOpacity style={add_guest} onPress={handleAddGuest}>
				<AntDesign
					name='adduser'
					size={24}
					color={app_colors.secondary_badge}
				/>
			</TouchableOpacity>
			<View style={guest_input_container}>
				{guestForm.map((guest, index) => {
					return (
						<View style={guest_row}>
							<TextInput
								key={index}
								value={guest.fulName}
								style={guest_input}
								placeholder='Nombre del invitado'
								onChangeText={(value: string) => handleTextChange(index, value)}
							/>
							<TouchableOpacity onPress={() => handleRemoveGuest(index)}>
								<AntDesign
									name='close'
									size={18}
									color='black'
									style={{ marginTop: "50%", color: app_colors.text_gray }}
								/>
							</TouchableOpacity>
						</View>
					);
				})}
			</View>
		</View>
	);
};

GuestPicker.defaultProps = {
	guests: [],
	handlePicker: () => {},
};
