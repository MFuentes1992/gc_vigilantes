import { Provider, useSelector } from "react-redux";
import { Header } from "react-native-elements";
import { store, persistor, RootState } from "@gcVigilantes/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@gcVigilantes/pages/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";
import VisitaInfo from "@gcVigilantes/pages/VisitaInfo";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ROUTES, getLabelApp } from "@gcVigilantes/utils";
import { ActivationCode } from "@gcVigilantes/pages/ActivationCode/ActivationCode";
import { Alerts } from "@gcVigilantes/Components/Alerts/Alerts";
import { CameraScreen } from "@gcVigilantes/pages/CameraScreen/CameraScreen";

export default function App() {
	const Stack = createStackNavigator();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Alerts>
					<Header containerStyle={{ backgroundColor: app_colors.header }} />
					<NavigationContainer>
						<Stack.Navigator initialRouteName='activation-code'>
							<Stack.Group
								screenOptions={{
									headerStyle: {
										backgroundColor: app_colors.primary,
										height: 50,
									},
									headerTintColor: app_colors.white,
									headerTitleStyle: {
										fontWeight: "normal",
										fontSize: 16,
									},
								}}>
								<Stack.Screen
									name='activation-code'
									options={{ title: "" }}
									component={ActivationCode}
								/>
								<Stack.Screen
									name='Vigilante-qr'
									options={{ title: "Home" }}
									component={HomeScreen}
								/>
								<Stack.Screen
									name='VisitaInfo'
									options={{ title: "Detalles de Visita" }}
									component={VisitaInfo}
								/>
								<Stack.Screen
									name={ROUTES.CAMERA}
									options={{ title: "Escanear código" }}
									component={() => <CameraScreen type='back' />}
								/>
							</Stack.Group>
						</Stack.Navigator>
					</NavigationContainer>
				</Alerts>
			</PersistGate>
		</Provider>
	);
}
