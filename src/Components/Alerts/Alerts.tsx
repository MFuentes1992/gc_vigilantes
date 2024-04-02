import { RootState } from "@gcVigilantes/store";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const Alerts = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();
	const { showAlert, title, message } = useSelector(
		(state: RootState) => state.alerts
	);

	useEffect(() => {
		if (showAlert) {
			Alert.alert(title, message, [
				{
					text: "OK",
					onPress: () => {
						dispatch(
							setShowAlert({ showAlert: false, title: "", message: "" })
						);
					},
				},
			]);
		}
	}, [showAlert]);

	return <>{children}</>;
};
