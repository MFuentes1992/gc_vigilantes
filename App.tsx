import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store, persistor } from "@gcVigilantes/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@gcVigilantes/pages/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";
import VisitaInfo from "@gcVigilantes/pages/VisitaInfo";

export default function App() {
	const Stack = createStackNavigator();

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Vigilante-qr'>
						<Stack.Screen name='Vigilante-qr' component={HomeScreen} />
						<Stack.Screen name='VisitaInfo' component={VisitaInfo} />
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
