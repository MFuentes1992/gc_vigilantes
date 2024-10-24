import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: app_colors.white,
    borderTopWidth: 0.5,
    borderTopColor: app_colors.ligth_bg,
    borderRightWidth: 0.5,
    borderRightColor: app_colors.ligth_bg,
    borderBottomWidth: 0.5,
    borderBottomColor: app_colors.ligth_bg,
  },
  left_color_strip: {
    width: "2%",
    height: "100%",
    backgroundColor: app_colors.secondary_badge,
  },
  right_content: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
