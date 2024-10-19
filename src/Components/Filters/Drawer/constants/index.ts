import { StyleSheet } from "react-native";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const drawer_card_styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
    backgroundColor: app_colors.white,
    padding: "2%",
    borderColor: app_colors.ligth_bg,
    borderWidth: 0.5,
  },
});
