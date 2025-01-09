import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const styles: { [key: string]: any } = StyleSheet.create({
  trashBin: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: app_colors.light_pale_bg,
    padding: 5,
    borderRadius: 5,
    zIndex: 100,
    width: 30,
  },
});
