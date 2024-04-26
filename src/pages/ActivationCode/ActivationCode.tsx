import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
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
	const [dataBaseCode, setDataBaseCod] = useState<string>("");
	const { access_token } = useSelector((state: RootState) => state.userData);
	const [loading, setLoading] = useState<boolean>(true);
	const preferences = useSelector((state: RootState) => state.preferences);

	useEffect(() => {
		setLoading(true);
		AsyncStorage.getItem("database_code")
			.then((res) => {
				if (res === "" || res === null) {
					setLoading(false);
				}
				if (res) {
					setDataBaseCod(res);
					AsyncStorage.getItem("token_instalacion")
						.then((res) => {
							if (res) {
								Authenticate(dataBaseCode).then((res) => {
									if (res) {
										AsyncStorage.getItem("activation_code")
											.then((res) => {
												if (res) {
													getActivationCode(res)
														.then((res) => res.json())
														.then((data) => {
															if (
																data.code === 203 ||
																data.code === "203" ||
																data.code === 200 ||
																data.code === "200"
															) {
																navigation.replace(ROUTES.HOME);
															} else {
																setLoading(false);
															}
														})
														.catch((error) => {
															setLoading(false);
															console.log(
																"Error al obtener token de activación",
																error
															);
														});
												}
											})
											.catch((error) => {
												setLoading(false);
												console.log(
													"Error al obtener token de activación",
													error
												);
											});
									}
								});
							}
						})
						.catch((error) => {
							setLoading(false);
							console.log("Error al obtener token de instalación", error);
						});
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log("Error al obtener database_code", error);
			});
	}, []);

	const Authenticate = async (dbCode: string) => {
		const res = await InitializeConnection(
			"analisis@dasgalu.com.mx",
			"123456",
			dbCode,
			authenticate
		);
		if (res) {
			dispatch(
				setUserData({
					access_token: res.access_token,
					database_code: dbCode,
					name: res.name,
					residence: res.residence,
					id: res.id,
				})
			);
			return true;
		}
		return false;
	};

	const handleTextChange = (value: string) => {
		setActivationCode(value);
	};

	const handleDataBaseChange = (value: string) => {
		setDataBaseCod(value);
	};

	const handleSubmit = () => {
		if (dataBaseCode === "") {
			setLoading(false);
			Alert.alert(
				"Error",
				getLabelApp(preferences.language, "app_empty_field")
			);
			return;
		}
		if (activationCode === "") {
			setLoading(false);
			Alert.alert(
				"Error",
				getLabelApp(preferences.language, "app_empty_field")
			);
			return;
		}
		Authenticate(dataBaseCode)
			.then((raw) => {
				if (raw) {
					getActivationCode(activationCode)
						.then((res) => {
							res
								.json()
								.then((data) => {
									const resp = JSON.parse(JSON.stringify(data));
									if (resp.code === 200 || resp.code === "200") {
										AsyncStorage.setItem(
											"token_instalacion",
											data.token_instalacion
										)
											.then(() => {
												AsyncStorage.setItem("activation_code", activationCode);
												AsyncStorage.setItem("database_code", dataBaseCode);
												navigation.replace(ROUTES.HOME);
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
									return resp;
								})
								.catch((error) =>
									console.log("Error al parsear token de activación", error)
								);
						})
						.catch((error) =>
							console.log("Error al obtener token de activación", error)
						);
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log("Error al Iniciar conexón", error);
			})
			.finally(() => setLoading(false));
	};

	return (
		<ScrollView>
			{!loading && (
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
						<TextInput
							style={{
								fontSize: 16,
								height: 40,
								padding: 10,
							}}
							value={dataBaseCode}
							onChangeText={handleDataBaseChange}
							placeholder={getLabelApp(
								preferences.language,
								"app_database_code"
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
			)}
			{loading && (
				<View style={container}>
					<Text>Cargando...</Text>
				</View>
			)}
		</ScrollView>
	);
};
