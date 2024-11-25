import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const FooterStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 50,
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: app_colors.header,
    color: "white",
    padding: 10,
  },
  text: {
    color: app_colors.primary,
  },
  icon: {
    color: app_colors.primary,
  },
});
