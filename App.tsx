import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Header } from "react-native-elements";
import { store, persistor } from "@gcVigilantes/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@gcVigilantes/pages/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";
import VisitaInfo from "@gcVigilantes/pages/VisitaInfo";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export default function App() {
	const Stack = createStackNavigator();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Header containerStyle={{ backgroundColor: app_colors.header }} />
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Vigilante-qr'>
						<Stack.Group
							screenOptions={{
								headerStyle: {
									backgroundColor: app_colors.primary,
									height: 50,
								},
								headerTintColor: app_colors.white,
								headerTitleStyle: {
									fontWeight: "100",
								},
							}}>
							<Stack.Screen
								name='Vigilante-qr'
								options={{ title: "Home" }}
								component={HomeScreen}
							/>
							<Stack.Screen name='VisitaInfo' component={VisitaInfo} />
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
