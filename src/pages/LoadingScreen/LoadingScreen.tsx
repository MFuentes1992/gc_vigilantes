import React, { useRef } from "react";
import ModalContainer from "@gcVigilantes/Components/ModalContainer";
import { View, Text } from "react-native";
import { LoadingScreenStyles } from "./style.default";
import LottieView from "lottie-react-native";
import { app_text_title } from "@gcVigilantes/utils/default.styles";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";

type LoadingScreenProps = {
	children: React.ReactNode;
};

export const LoadingScreen = (props: LoadingScreenProps) => {
	const animation = useRef(null);
	const { isLoading } = useSelector((state: RootState) => state.ui);
	return (
		<>
			{props.children}
			<ModalContainer visible={isLoading}>
				<View style={LoadingScreenStyles}>
					<Text style={app_text_title}>Cargando...</Text>
					<LottieView
						source={require("../../../assets/loading.json")}
						ref={animation}
						style={{
							width: "100%",
							height: "70%",
						}}
						autoPlay
						loop
					/>
				</View>
			</ModalContainer>
		</>
	);
};
