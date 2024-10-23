import React from "react";
import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { logsStyles } from "./constants";
import { Filters } from "@gcVigilantes/Components/Filters/Filters";
import { Drawer } from "@gcVigilantes/Components/Filters/Drawer/Drawer";
import { LogCard } from "@gcVigilantes/pages/Logs/component/LogCard/LogCard";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const Logs = () => {
  return (
    <View style={logsStyles.constainer}>
      <Filters position="right" drawerComponent={Drawer} />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          height: "100%",
        }}
      >
        <LogCard
          date="01 de Enero de 2021"
          time="10:00"
          address="Calle 123"
          name="Juan Pérez"
          type="Visita"
          ingress="Vehículo"
        />
        <LogCard
          date="01 de Enero de 2021"
          time="10:00"
          address="Calle 123"
          name="Juan Pérez"
          type="Visita"
          ingress="Peatonal"
        />
      </ScrollView>
    </View>
  );
};
