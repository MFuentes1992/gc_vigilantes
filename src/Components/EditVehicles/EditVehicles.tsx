import React, { useEffect } from "react";
import { Modal, TextInput } from "react-native";
import { View } from "react-native-animatable";
import { ModalStyles, defaultContainer, inputStyles } from "./constants";
import { FormSaveButtons } from "../FormSaveButtons/FormSaveButtons";
import { CardTitle } from "../CardTitle/CardTitle";
import { card_styles_extended } from "@gcVigilantes/pages/VisitaInfo/constants";
import { ScrollView } from "react-native-gesture-handler";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { HeaderActionButton } from "../HeaderActionButton/HeaderActionButton";

type EditVehiclesProps = {
	id: number;
	brand: string;
	model: string;
	year: string;
	color: string;
	plate: string;
	visible: boolean;
	handleOnChange: (index: number, key: string, value: string) => void;
	handleClose: () => void;
};

export const EditVehicles = ({
	id,
	brand,
	model,
	year,
	color,
	plate,
	visible,
	handleOnChange,
	handleClose,
}: EditVehiclesProps) => {
	const [modalVisible, setModalVisible] = React.useState<boolean>(visible);

	useEffect(() => {
		setModalVisible(visible);
	}, [visible]);

	return (
		<View key='container-edit-vehicle' style={card_styles_extended}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					marginTop: "2%",
					marginBottom: "5%",
				}}>
				<HeaderActionButton
					icon='times-circle'
					color={app_colors.red}
					onPress={handleClose}
				/>
			</View>
			<CardTitle title={plate} uppercase />
			<TextInput
				style={inputStyles}
				onChangeText={(brand: string) => handleOnChange(id, "marca", brand)}
				value={brand}
				placeholder='Marca del vehículo'
			/>
			<TextInput
				style={inputStyles}
				onChangeText={(model: string) => handleOnChange(id, "modelo", model)}
				value={model}
				placeholder='Modelo del vehículo'
			/>
			<TextInput
				style={inputStyles}
				onChangeText={(year: string) => handleOnChange(id, "anio", year)}
				value={year}
				placeholder='Año del vehículo'
				keyboardType='numeric'
			/>
			<TextInput
				style={inputStyles}
				onChangeText={(color: string) => handleOnChange(id, "color", color)}
				value={color}
				placeholder='Color del vehículo'
			/>
			<TextInput
				style={inputStyles}
				onChangeText={(plate: string) => handleOnChange(id, "placas", plate)}
				value={plate}
				placeholder='Matrícula del vehículo'
			/>
		</View>
	);
};
