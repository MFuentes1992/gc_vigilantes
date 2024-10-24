import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const logsStyles = StyleSheet.create({
  constainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0", // light bg color here,
  },
  filterContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  filterIcon: {
    position: "relative",
    width: 30,
    height: 30,
  },
});
