import React, { useEffect, useState } from "react";
import { Image, View, Button, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import RNQRGenerator from "rn-qr-generator";

export const HomeScreen = () => {
	const [selectedImage, setSelectedImage] = useState<string>("");

	useEffect(() => {
		if (selectedImage !== "") {
			RNQRGenerator.detect({
				uri: selectedImage,
			})
				.then((response) => {
					const { values } = response; // Array of detected QR code values. Empty if nothing found.
					console.log("Detected QR code values", values);
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
		<View>
			<Button onPress={handleOpenLibrary} title='Abrir desde galeria' />
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
	);
};
