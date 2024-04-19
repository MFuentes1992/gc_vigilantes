import React, { useEffect, useRef, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";

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
	handleOnChange,
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
	const visita = useSelector((state: RootState) => state.visita);
	const [vehicles, setVehicles] = useState<VehiclesResType[]>([]);

	useEffect(() => {
		if (visita.vehicles?.length > 0) setVehicles(visita.vehicles);
	}, [visita.vehicles]);

	return (
		<View>
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
						handleOnChange("tipo_visita", value);
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
						onChangeText={(value: string) => {
							setNombreVisita(value);
							handleOnChange("nombre_visita", value);
						}}
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
						handleOnChange("tipo_ingreso", value);
					}}
				/>
			</View>
			{tipoIngresoState == TIPO_INGRESO.VEHICULO.id && (
				<>
					<ScrollView
						style={mainInfoVehicleScrollStyles}
						contentContainerStyle={getVehicleInfoStyles(vehicles)}
						horizontal>
						{vehicles.map((vehicle: VehiclesResType) => (
							<VehicleCard key={vehicle.placas} vehicle={vehicle} />
						))}
					</ScrollView>
				</>
			)}
		</View>
	);
};
