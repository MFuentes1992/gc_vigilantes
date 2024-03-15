import React, { useRef, useState } from "react";
import {
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";

import {
	TextInput,
	View,
	Image,
	Text,
	Animated,
	TouchableOpacity,
} from "react-native";
import { MainInfoProps, card_styles } from "./constants";
import { VehicleInfo } from "@gcVigilantes/Components/VehicleInfo/VehicleInfo";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { app_text_body } from "@gcVigilantes/utils/default.styles";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

	// console.log("Tipo ingreso props", tipoIngreso);
	// console.log("Tipo ingreso state", tipoIngresoState);

	return (
		<>
			<View style={card_styles}>
				<CardTitle title='tipo de visita' uppercase />
				<RadioGroup
					selectedValue={tipoVisitaState}
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
				<CardTitle title='Nombre' uppercase />
				<TextInput
					style={{
						width: "100%",
						height: 40,
						borderBottomColor: "gray",
						borderBottomWidth: 0.5,
					}}
					value={nombreVisitaState}
					placeholder='Ingrese aqui el nombre de la visita'
					onFocus={() => {}}
					onBlur={() => {}}
					onChangeText={(text) => console.log("nombre visita", text)}
					autoCapitalize='words'
					maxLength={50}
				/>
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
				<CardTitle title='Tipo ingreso' uppercase />
				<RadioGroup
					options={catalogIngreso.map((catalog) => ({
						id: catalog.id,
						label: catalog.tipo_ingreso,
						icon: TipoVisitasIcon[
							catalog.tipo_ingreso
						] as unknown as React.ReactNode,
					}))}
					selectedValue={tipoIngresoState}
					handleChange={(value: string) => {
						setTipoIngreso(value);
						console.log("TipoIngreso", value);
					}}
				/>
			</View>
			{tipoIngresoState === "5" && (
				<View style={card_styles}>
					<VehicleInfo
						handleData={(data: { [key: string]: string }) => {
							console.log("Vehicle info", data);
						}}
					/>
				</View>
			)}
			{tipoIngresoState == "1" && (
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
							source={require("assets/image.jpg")}
						/>
					</Animatable.View>
					<ScrollView
						style={{
							width: "100%",
							height: 220,
							top: -110,
							zIndex: 1,
							marginBottom: 0,
						}}
						contentContainerStyle={{
							top: 0,
							width: vehicles.length * 200,
							justifyContent: "space-around",
						}}
						horizontal>
						{vehicles.map((vehicle, index) => (
							<View
								key={index}
								style={{
									width: 180,
									padding: "2%",
									margin: "5%",
									borderRadius: 10,
									backgroundColor: app_colors.white,
									alignContent: "center",
									alignItems: "center",
									elevation: 7,
									top: 0,
								}}>
								<View
									style={{
										flexDirection: "row",
										width: "100%",
										justifyContent: "space-between",
										alignItems: "flex-end",
										marginBottom: 10,
									}}>
									<FontAwesome5
										name='edit'
										size={16}
										color={app_colors.text_gray}
									/>
									<FontAwesome5
										name='times'
										size={16}
										color={app_colors.text_gray}
									/>
								</View>
								<View style={{ flexDirection: "row", width: "100%" }}>
									<View
										style={{
											width: "30%",
											padding: "5%",
											borderRightWidth: 1,
											borderRightColor: app_colors.ligth_bg,
										}}>
										<Image
											width={40}
											height={40}
											style={{ width: 40, height: 40, resizeMode: "contain" }}
											source={require("assets/topView.png")}
										/>
									</View>
									<View style={{ width: "70%", padding: "5%" }}>
										<Text
											style={
												app_text_body
											}>{`${vehicle.marca} ${vehicle.modelo}`}</Text>
										<Text style={app_text_body}>
											{`${vehicle.color} / ${vehicle.anio}`}
										</Text>
										<Text style={app_text_body}>{vehicle.placas}</Text>
									</View>
								</View>
							</View>
						))}
					</ScrollView>
				</>
			)}
		</>
	);
};
