import { RootState } from "@gcVigilantes/store";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../ModalContainer";
import LottieView from "lottie-react-native";
import {
	ALERT_TYPES,
	AlertBodyStyles,
	AlertContainerStyles,
	AlertTextStyles,
	HeaderStyles,
} from "./constants";
import {
	app_text_subtitle,
	app_text_title,
} from "@gcVigilantes/utils/default.styles";

export const Alerts = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	const { showAlert, title, message, type } = useSelector(
		(state: RootState) => state.alerts
	);

	const hideAlert = () => {
		dispatch(
			setShowAlert({
				showAlert: false,
				title: "",
				message: "",
				type: ALERT_TYPES.SUCCESS,
			})
		);
	};

	useEffect(() => {
		if (showAlert) {
			setTimeout(() => {
				hideAlert();
			}, 3000);
		}
	}, [showAlert]);

	return (
		<>
			{children}
			<ModalContainer visible={showAlert} animationType='fade'>
				<View style={AlertContainerStyles}>
					<View style={HeaderStyles}>
						<Text style={[app_text_title, { textTransform: "uppercase" }]}>
							{title}
						</Text>
					</View>
					<View style={AlertBodyStyles}>
						{type === ALERT_TYPES.SUCCESS && (
							<LottieView
								source={require("../../../assets/success.json")}
								style={{
									width: "20%",
									height: 100,
									flex: 0.3,
									alignContent: "center",
								}}
								resizeMode='contain'
								renderMode='AUTOMATIC'
								autoPlay
								loop={false}
							/>
						)}
						{type === ALERT_TYPES.ERROR && (
							<LottieView
								source={require("../../../assets/error.json")}
								style={{
									width: "20%",
									height: 100,
									flex: 0.3,
									alignContent: "center",
								}}
								resizeMode='contain'
								renderMode='AUTOMATIC'
								autoPlay
								loop={false}
							/>
						)}
						<View style={AlertTextStyles}>
							<Text style={app_text_subtitle}>{message}</Text>
						</View>
					</View>
				</View>
			</ModalContainer>
		</>
	);
};
