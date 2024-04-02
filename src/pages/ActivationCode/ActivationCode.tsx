import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	authenticate,
	container,
	getActivationCode,
	submit_button,
	title_container,
} from "./constants";
import { RootState } from "@gcVigilantes/store";
import { ROUTES, getLabelApp } from "@gcVigilantes/utils";
import { InitializeConnection } from "./constants";

import { setUserData } from "@gcVigilantes/store/UserData";
import { app_text_title } from "@gcVigilantes/utils/default.styles";
import { card_styles } from "../VisitaInfo/constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ScrollView } from "react-native-gesture-handler";
import { setShowAlert } from "@gcVigilantes/store/Alerts";

export const ActivationCode = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [activationCode, setActivationCode] = useState<string>("");
	const { access_token } = useSelector((state: RootState) => state.userData);
	const preferences = useSelector((state: RootState) => state.preferences);

	useEffect(() => {
		if (access_token === "") {
			InitializeConnection(
				"analisis@dasgalu.com.mx",
				"123456",
				"PXWUQ3V3Y9",
				authenticate
			)
				.then((response) => {
					dispatch(
						setUserData({
							access_token: response.access_token,
							name: response.name,
							residence: response.residence,
							id: response.id,
						})
					);
					AsyncStorage.getItem("token_instalacion")
						.then((token_ins) => {
							if (token_ins !== null) {
								navigation.navigate(ROUTES.HOME);
							}
						})
						.catch(() => {
							console.log("Token Instalacion no encontrado");
						});
				})
				.catch((error) => console.log("Error authenticating", error));
		}
	}, []);

	const handleTextChange = (value: string) => {
		setActivationCode(value);
	};

	const handleSubmit = () => {
		getActivationCode(activationCode)
			.then((res) => {
				res
					.json()
					.then((data) => {
						const resp = JSON.parse(JSON.stringify(data));
						if (resp.code === 200 || resp.code === "200") {
							console.log("data", data);
							AsyncStorage.setItem("token_instalacion", data.token_instalacion)
								.then(() => {
									navigation.navigate(ROUTES.HOME);
								})
								.catch((error) => {
									dispatch(
										setShowAlert({
											showAlert: true,
											title: "Error",
											message: error,
										})
									);
								});
						} else {
							dispatch(
								setShowAlert({
									showAlert: true,
									title: "Error",
									message: resp.message,
								})
							);
						}
					})
					.catch((error) =>
						console.log("Error al parsear token de activación", error)
					);
			})
			.catch((error) =>
				console.log("Error al obtener token de activación", error)
			);
	};

	return (
		<ScrollView>
			<View style={container}>
				<View style={title_container}>
					<Text style={app_text_title}>
						{getLabelApp(preferences.language, "app_activation_code")}
					</Text>
				</View>
				<View style={card_styles}>
					<TextInput
						style={{
							fontSize: 16,
							height: 40,
							padding: 10,
						}}
						value={activationCode}
						onChangeText={handleTextChange}
						placeholder={getLabelApp(
							preferences.language,
							"app_activation_code_placeholder"
						)}
					/>
				</View>
				<View style={card_styles}>
					<TouchableOpacity style={submit_button} onPress={handleSubmit}>
						<Text style={{ color: app_colors.white }}>
							{getLabelApp(preferences.language, "app_submit_continue")}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};
