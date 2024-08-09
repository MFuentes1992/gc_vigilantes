import { ViewStyle } from "react-native";
import { ENDPOINTS } from "@gcVigilantes/utils";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const container: ViewStyle = {
  flex: 1,
  width: "100%",
};

export const container_animation: ViewStyle = {
  flex: 1,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
};

export const title_container: ViewStyle = {
  width: "100%",
  padding: 15,
};

export const submit_button: ViewStyle = {
  width: "100%",
  padding: 15,
  backgroundColor: app_colors.secondary,
  alignItems: "center",
};

export const formRules = {
  activationCode: {
    required: true,
  },
  dataBaseCode: {
    required: true,
  },
};
