import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export const qrStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  tab_container: {
    position: "relative",
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    marginBottom: "25%",
    backgroundColor: app_colors.light_blue_pale,
  },
  qr_container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  qr_body: {
    position: "relative",
    width: "100%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  image_container: {
    position: "relative",
    display: "flex",
    padding: 20,
    backgroundColor: app_colors.ligth_bg,
    borderRadius: 10,
    marginBottom: 20,
  },
  button_tab: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button_badge: {
    width: "40%",
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3498DB",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
