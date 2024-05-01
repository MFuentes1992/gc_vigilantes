import React, { useRef } from "react";
import ModalContainer from "@gcVigilantes/Components/ModalContainer";
import { Animated, View, Text } from "react-native";
import { LoadingScreenStyles } from "./style.default";
import LottieView from "lottie-react-native";
import {
	app_text_menu,
	app_text_title,
} from "@gcVigilantes/utils/default.styles";

type LoadingScreenProps = {
	children: React.ReactNode;
};

export const LoadingScreen = (props: LoadingScreenProps) => {
	const AnimatedLottie = Animated.createAnimatedComponent(LottieView);
	const animation = useRef(null);
	return (
		<>
			{props.children}
			<ModalContainer visible>
				<View style={LoadingScreenStyles}>
					<Text style={[app_text_title]}>Leyendo datos</Text>
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
