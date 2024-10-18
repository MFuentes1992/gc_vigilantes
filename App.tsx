import { Provider, useSelector } from "react-redux";
import { Header } from "react-native-elements";
import { store, persistor, RootState } from "@gcVigilantes/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ReadQR from "@gcVigilantes/pages/ReadQR";
import { PersistGate } from "redux-persist/integration/react";
import VisitaInfo from "@gcVigilantes/pages/VisitaInfo";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ROUTES, getLabelApp } from "@gcVigilantes/utils";
import { ActivationCode } from "@gcVigilantes/pages/ActivationCode/ActivationCode";
import { Alerts } from "@gcVigilantes/Components/Alerts/Alerts";
import { CameraScreen } from "@gcVigilantes/pages/CameraScreen/CameraScreen";
import LoadingScreen from "@gcVigilantes/pages/LoadingScreen";
import { Home } from "@gcVigilantes/pages/Home/Home";
import { View } from "react-native";
import { Footer } from "@gcVigilantes/Components/Footer/Footer";
import { LogoContainer } from "@gcVigilantes/Components/LogoContainer/LogoContainer";
import { Logs } from "@gcVigilantes/pages/Logs/Logs";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header
          containerStyle={{
            backgroundColor: app_colors.header,
            minHeight: 50,
          }}
        />
        <LoadingScreen>
          <Alerts>
            <NavigationContainer>
              <Stack.Navigator initialRouteName={ROUTES.ACTIVATION_CODE}>
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
                  }}
                >
                  <Stack.Screen
                    name={ROUTES.ACTIVATION_CODE}
                    options={{ title: "" }}
                    component={ActivationCode}
                  />
                  <Stack.Screen
                    name={ROUTES.HOME}
                    options={{
                      title: getLabelApp("es", "app_screen_home_screen"),
                    }}
                    component={Home}
                  />
                  <Stack.Screen
                    name={ROUTES.QR}
                    options={{
                      title: getLabelApp("es", "app_screen_read_qr"),
                      headerRight: () => <LogoContainer />,
                    }}
                    component={ReadQR}
                  />
                  <Stack.Screen
                    name={ROUTES.VISIT_INFO}
                    options={{
                      title: getLabelApp("es", "app_screen_visit_info"),
                      headerRight: () => <LogoContainer />,
                    }}
                    component={VisitaInfo}
                  />
                  <Stack.Screen
                    name={ROUTES.CAMERA}
                    options={{
                      title: getLabelApp("es", "app_screen_read_qr"),
                      headerRight: () => <LogoContainer />,
                    }}
                    component={CameraScreen}
                  />
                  <Stack.Screen
                    name={ROUTES.LOGS}
                    options={{
                      title: getLabelApp("es", "app_screen_visit_logs"),
                    }}
                    component={Logs}
                  />
                </Stack.Group>
              </Stack.Navigator>
              <Footer />
            </NavigationContainer>
          </Alerts>
        </LoadingScreen>
      </PersistGate>
    </Provider>
  );
}
