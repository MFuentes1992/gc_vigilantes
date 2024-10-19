import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const ic_fs = 24;
export const ic_fc = "black";

export const styles: { [key: string]: any } = StyleSheet.create({
  filterContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    height: 35,
    paddingRight: 5,
    backgroundColor: app_colors.red,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    position: "relative",
    width: 35,
    height: 35,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: app_colors.primary,
  },
  drawer: {
    position: "absolute",
    width: "50%",
    height: "100%",
    minHeight: 1000,
    top: 35,
    right: 0,
    backgroundColor: app_colors.secondary,
  },
});
