import { ROUTES } from "@gcVigilantes/utils";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, StyleSheet } from "react-native";
import {
	Camera,
	Code,
	useCameraDevice,
	useCodeScanner,
} from "react-native-vision-camera";

type CameraScreenProps = {
	type: "front" | "back";
};

export const CameraScreen = ({ type }: CameraScreenProps) => {
	const navigation = useNavigation<any>();
	const device = useCameraDevice(type);
	const codeScanner = useCodeScanner({
		codeTypes: ["qr", "ean-13"],
		onCodeScanned: (codes) => {
			codes.forEach((code) => {
				if (
					code?.value?.includes("visita") &&
					code?.value?.includes("read-qr")
				) {
					const tmpArray = code.value.toString().split("/");
					navigation.navigate(ROUTES.VISIT_INFO);
					navigation.navigate("VisitaInfo", {
						uniqueID: tmpArray[tmpArray.length - 1],
						uri: "https://apimovilgc.dasgalu.net/assets/preview.jpeg",
					});
				}
			});
		},
	});
	if (device == null) return <Text>No camera found.</Text>;
	return (
		<Camera
			style={StyleSheet.absoluteFill}
			device={device}
			isActive={true}
			codeScanner={codeScanner}
		/>
	);
};
