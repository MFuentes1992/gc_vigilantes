import { StyleSheet } from "react-native";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const vehicleCardStyles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
});

export const addVehicleNotificationsStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderRadius: 3,
    backgroundColor: app_colors.red,
  },
  text: {
    fontSize: 14,
    color: app_colors.white,
  },
});
