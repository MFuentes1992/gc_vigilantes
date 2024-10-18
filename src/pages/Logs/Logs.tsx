import React from "react";
import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { logsStyles } from "./constants";
import { Filters } from "@gcVigilantes/Components/Filters/Filters";

export const Logs = () => {
  return (
    <ScrollView contentContainerStyle={logsStyles.constainer}>
      <Filters position="right" />
    </ScrollView>
  );
};
