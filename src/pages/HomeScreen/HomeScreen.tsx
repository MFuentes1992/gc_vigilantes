import React, { useState } from "react";
import { Image, View, Button, Text } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

export const HomeScreen = () => {
	const [selectedImage, setSelectedImage] = useState<string>("");
	const handleOpenLibrary = () => {
		launchImageLibrary({
			mediaType: "photo",
			includeBase64: false,
			maxHeight: 200,
			maxWidth: 200,
		})
			.then((response) => {
				console.log("====================================");
				console.log(response);
				console.log("====================================");
				if (response?.assets) setSelectedImage(response?.assets[0].uri || "");
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<View>
			<Button onPress={handleOpenLibrary} title='Abrir desde galeria' />
			<Text>{selectedImage}</Text>
			{selectedImage.length > 0 && (
				<Image
					source={{
						uri: selectedImage,
					}}
				/>
			)}
		</View>
	);
};
