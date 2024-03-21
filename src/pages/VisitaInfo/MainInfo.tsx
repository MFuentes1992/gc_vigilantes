import React, { useRef, useState } from "react";
import {
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";

import { TextInput, View, Image, Text } from "react-native";
import {
	MainInfoProps,
	TIPO_INGRESO,
	card_styles,
	getVehicleInfoStyles,
	mainInfoVehicleScrollStyles,
} from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ScrollView } from "react-native-gesture-handler";
import { VehicleCard } from "@gcVigilantes/Components/VehicleCard/VehicleCard";

export const TipoVisitasIcon: { [key: string]: React.ReactNode } = {
	Visita: <FontAwesome name='user' size={18} color='darkgray' />,
	Provedor: <FontAwesome name='truck' size={18} color='darkgray' />,
	["Servicio domestico"]: (
		<FontAwesome name='wrench' size={18} color='darkgray' />
	),
	["Vehículo"]: <FontAwesome name='car' size={24} color='darkgray' />,
	Peatonal: <FontAwesome5 name='walking' size={24} color='darkgray' />,
	single: <FontAwesome name='user' size={24} color='darkgray' />,
	multiple: (
		<MaterialCommunityIcons
			name='account-multiple-plus'
			size={24}
			color='black'
		/>
	),
};

export const MainInfo = ({
	tipoVisita,
	tipoIngreso,
	nombreVisita,
	catalogVisitas,
	catalogIngreso,
}: MainInfoProps) => {
	const [tipoVisitaState, setTipoVisita] = useState<string>(tipoVisita);
	const [tipoIngresoState, setTipoIngreso] = useState<string>(tipoIngreso);
	const [nombreVisitaState, setNombreVisita] = useState<string>(nombreVisita);
	// -- Disabling and enabling Cards
	const [tipoVisitaDisabled, setTipoVisitaDisabled] = useState<boolean>(true);
	const [tipoIngresoDisabled, setTipoIngresoDisabled] = useState<boolean>(true);
	const [nombreVisitaDisabled, setNombreVisitaDisabled] =
		useState<boolean>(true);
	// -- Vehicle info
	const [vehicles, setVehicles] = useState<{ [key: string]: string }[]>([
		{
			marca: "Ford",
			modelo: "Escape",
			anio: "1992",
			placas: "PBT-000A",
			color: "Negro",
		},
		{
			marca: "Ford",
			modelo: "Focus",
			anio: "2002",
			placas: "PBT-000B",
			color: "Gris",
		},
		{
			marca: "Ford",
			modelo: "Escape",
			anio: "1992",
			placas: "PBT-000A",
			color: "Negro",
		},
		{
			marca: "Ford",
			modelo: "Focus",
			anio: "2002",
			placas: "PBT-000B",
			color: "Gris",
		},
	]);

	return (
		<>
			<View style={card_styles}>
				<CardTitle
					title='tipo de visita'
					uppercase
					editIcon
					handleEdit={() => setTipoVisitaDisabled(false)}
				/>
				<RadioGroup
					selectedValue={tipoVisitaState}
					disabled={tipoVisitaDisabled}
					options={catalogVisitas.map((catalog) => ({
						id: catalog.id,
						label: catalog.tipo_visita,
						icon: TipoVisitasIcon[
							catalog.tipo_visita
						] as unknown as React.ReactNode,
					}))}
					handleChange={(value: string) => {
						setTipoVisita(value);
					}}
				/>
			</View>
			<View style={card_styles}>
				<CardTitle
					title='Nombre'
					uppercase
					editIcon
					handleEdit={() => setNombreVisitaDisabled(false)}
				/>
				{nombreVisitaDisabled && (
					<Text style={{ color: app_colors.text_dark, left: 10 }}>
						{nombreVisita}
					</Text>
				)}
				{!nombreVisitaDisabled && (
					<TextInput
						style={{
							width: "90%",
							height: 40,
							borderBottomColor: "gray",
							borderBottomWidth: 0.5,
							left: 10,
							color: app_colors.text_dark,
						}}
						value={nombreVisitaState}
						placeholder='Ingrese aqui el nombre de la visita'
						onChangeText={setNombreVisita}
						autoCapitalize='words'
						maxLength={50}
					/>
				)}
			</View>
			<View
				style={[
					card_styles,
					{
						marginBottom: 0,
						zIndex: 1,
						elevation: tipoIngresoState == "1" ? 5 : 0,
					},
				]}>
				<CardTitle
					title='Tipo ingreso'
					uppercase
					editIcon
					handleEdit={() => setTipoIngresoDisabled(false)}
				/>
				<RadioGroup
					options={catalogIngreso.map((catalog) => ({
						id: catalog.id,
						label: catalog.tipo_ingreso,
						icon: TipoVisitasIcon[
							catalog.tipo_ingreso
						] as unknown as React.ReactNode,
					}))}
					selectedValue={tipoIngresoState}
					disabled={tipoIngresoDisabled}
					handleChange={(value: string) => {
						setTipoIngreso(value);
						console.log("TipoIngreso", value);
					}}
				/>
			</View>
			{tipoIngresoState == TIPO_INGRESO.VEHICULO.id && (
				<>
					<Animatable.View
						animation={"slideInDown"}
						iterationCount={1}
						duration={1000}
						style={{
							width: "100%",
							height: 150,
							top: -10,
							zIndex: 0,
						}}>
						<Image
							style={{
								width: "100%",
								height: "100%",
								margin: "auto",
							}}
							source={require("assets/vehicle_info.png")}
						/>
					</Animatable.View>
					<ScrollView
						style={mainInfoVehicleScrollStyles}
						contentContainerStyle={getVehicleInfoStyles(vehicles)}
						horizontal>
						{vehicles.map((vehicle: any, index) => (
							<VehicleCard vehicle={vehicle} />
						))}
					</ScrollView>
				</>
			)}
		</>
	);
};
