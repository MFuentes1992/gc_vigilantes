import React, { useEffect, useState } from "react";
import { Image, View, Button, Text, TouchableOpacity } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import RNQRGenerator from "rn-qr-generator";
import { InitializeConnection, authenticate } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { setUserData } from "@gcVigilantes/store/UserData";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const HomeScreen = ({ navigation }: any) => {
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = useState<string>("");
	const { access_token } = useSelector((state: RootState) => state.userData);

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
				})
				.catch((error) => console.log("Error authenticating", error));
		}
	}, []);

	useEffect(() => {
		if (selectedImage !== "") {
			RNQRGenerator.detect({
				uri: selectedImage,
			})
				.then((response) => {
					const { values } = response;
					const tmpArray = values.toString().split("/");
					console.log("Detected QR code values", values);
					navigation.navigate("VisitaInfo", {
						uniqueID: tmpArray[tmpArray.length - 1],
						uri: selectedImage,
					});
				})
				.catch((error) => console.log("Cannot detect QR code in image", error));
		}
	}, [selectedImage]);

	const handleOpenLibrary = () => {
		launchImageLibrary({
			mediaType: "photo",
			includeBase64: false,
			maxHeight: 200,
			maxWidth: 200,
		})
			.then((response) => {
				if (response?.assets) setSelectedImage(response?.assets[0].uri || "");
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<View style={{ flex: 1, top: "5%" }}>
			<View
				style={{
					flex: 0.4,
					justifyContent: "center",
					alignItems: "center",
					marginBottom: "2%",
				}}>
				<View
					style={{
						flex: 1,
						width: "60%",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						padding: 5,
						backgroundColor: app_colors.ligth_bg,
						borderRadius: 10,
					}}>
					<Image
						width={200}
						height={200}
						source={{
							uri:
								selectedImage ||
								"https://apimovilgc.dasgalu.net/assets/preview.jpeg",
						}}
					/>
				</View>
			</View>
			<View style={{ flexDirection: "row", justifyContent: "center" }}>
				<TouchableOpacity
					style={{
						width: "40%",
						backgroundColor: "#5DADE2",
						borderRadius: 5,
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						height: 30,
						justifyContent: "center",
						alignItems: "center",
						borderColor: "#3498DB",
						borderStyle: "solid",
						borderWidth: 1,
					}}
					onPress={handleOpenLibrary}>
					<Text
						style={{
							color: "#FFF",
						}}>
						Abrir desde galeria
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: "40%",
						backgroundColor: "#FFF",
						borderRadius: 5,
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0,
						height: 30,
						justifyContent: "center",
						alignItems: "center",
						borderColor: "#3498DB",
						borderStyle: "solid",
						borderWidth: 1,
					}}
					onPress={handleOpenLibrary}>
					<Text
						style={{
							color: "#3498DB",
						}}>
						Escanear QR
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
