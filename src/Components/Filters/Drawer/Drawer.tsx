import { app_colors } from "@gcVigilantes/utils/default.colors";
import React from "react";
import { View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const Drawer = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        position: "relative",
        width: "100%",
      }}
    >
      <Text style={{ fontSize: 14, color: app_colors.black }}>
        This is the drawer containing the filters.
      </Text>
    </ScrollView>
  );
};
