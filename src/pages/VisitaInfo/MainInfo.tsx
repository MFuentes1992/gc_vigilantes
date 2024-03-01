import React, { useRef, useState } from "react";
import {
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";

import { TextInput, View, Image, Text, Animated } from "react-native";
import { MainInfoProps, card_styles } from "./constants";
import { VehicleInfo } from "@gcVigilantes/Components/VehicleInfo/VehicleInfo";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { app_text_body } from "@gcVigilantes/utils/default.styles";

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

export const MainInfo = ({ catalogVisitas, catalogIngreso }: MainInfoProps) => {
	const [tipoIngreso, setTipoIngreso] = useState<string>("");
	return (
		<>
			<View style={card_styles}>
				<CardTitle title='tipo de visita' uppercase />
				<RadioGroup
					options={catalogVisitas.map((catalog) => ({
						id: catalog.id,
						label: catalog.tipo_visita,
						icon: TipoVisitasIcon[
							catalog.tipo_visita
						] as unknown as React.ReactNode,
					}))}
					handleChange={(value: string) => {
						console.log("TipoVisita", value);
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
					placeholder='Ingrese aqui el nombre de la visita'
					onFocus={() => {}}
					onBlur={() => {}}
					onChangeText={(text) => console.log("nombre visita", text)}
					autoCapitalize='words'
					maxLength={50}
				/>
			</View>
			<View style={[card_styles, { marginBottom: 0 }]}>
				<CardTitle title='Tipo ingreso' uppercase />
				<RadioGroup
					options={catalogIngreso.map((catalog) => ({
						id: catalog.id,
						label: catalog.tipo_ingreso,
						icon: TipoVisitasIcon[
							catalog.tipo_ingreso
						] as unknown as React.ReactNode,
					}))}
					handleChange={(value: string) => {
						setTipoIngreso(value);
						console.log("TipoIngreso", value);
					}}
				/>
			</View>
			{tipoIngreso === "5" && (
				<View style={card_styles}>
					<VehicleInfo
						handleData={(data: { [key: string]: string }) => {
							console.log("Vehicle info", data);
						}}
					/>
				</View>
			)}
			{tipoIngreso == "1" && (
				<>
					<Animatable.View
						animation={"fadeIn"}
						iterationCount={1}
						duration={1000}
						style={{
							width: "100%",
							height: 100,
						}}>
						<Image
							style={{ width: "100%", height: "100%", overlayColor: "black" }}
							source={require("assets/vehicle_info.png")}
						/>
					</Animatable.View>

					<View
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Animatable.View
							animation={"fadeInUp"}
							iterationCount={1}
							duration={1000}
							style={{
								width: "60%",
								padding: "5%",
								borderRadius: 10,
								backgroundColor: app_colors.white,
								alignContent: "center",
								alignItems: "center",
								elevation: 7,
								top: -50,
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
									<Text style={app_text_body}>Ford Escape</Text>
									<Text style={app_text_body}>Negra / 2022</Text>
									<Text style={app_text_body}>PYH0608D</Text>
								</View>
							</View>
						</Animatable.View>
					</View>
				</>
			)}
		</>
	);
};
