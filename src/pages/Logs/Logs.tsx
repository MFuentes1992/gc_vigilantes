import React from "react";
import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { logsStyles } from "./constants";
import { Filters } from "@gcVigilantes/Components/Filters/Filters";
import { Drawer } from "@gcVigilantes/Components/Filters/Drawer/Drawer";

export const Logs = () => {
  return (
    <View style={logsStyles.constainer}>
      <Filters position="right" drawerComponent={Drawer} />
    </View>
  );
};
