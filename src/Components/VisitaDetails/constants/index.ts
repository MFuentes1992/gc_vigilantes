import { app_colors } from "@gcVigilantes/utils/default.colors";
import { TextStyle, ViewStyle } from "react-native";

export type VisitaDetailsProps = {
  uri: string;
  autor: string;
  emailAutor: string;
  estatus: number;
  num_int: string;
  seccion: string;
  direccion: string;
  notificaciones: boolean;
  selectedTab: string;
  handleNotificaciones: (value: boolean) => void;
  handleChangeTab: (tab: string) => void;
};

export const details_container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  height: "20%",
  backgroundColor: app_colors.white,
  padding: "5%",
  borderBottomColor: app_colors.text_gray,
  borderBottomWidth: 0.5,
};

export const details_menu: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
  backgroundColor: app_colors.white,
  marginBottom: 15,
};

export const details_info: ViewStyle = {
  flex: 1,
  width: "80%",
  paddingLeft: "2%",
};

export const defaultRow: ViewStyle = {
  flex: 0.6,
  width: "60%",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const details_badge_active: ViewStyle = {
  width: "25%",
  padding: "1%",
  backgroundColor: app_colors.secondary_badge,
  justifyContent: "center",
  alignItems: "center",
};

export const details_badge_inactive: ViewStyle = {
  width: "25%",
  padding: "1%",
  backgroundColor: app_colors.red_inactive_invalid,
  justifyContent: "center",
  alignItems: "center",
};

export const details_badge_text: TextStyle = {
  color: app_colors.white,
};
