import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export type TGuestPicker = {
  fulName: string;
};

export const guestpicker_contaier: any = {
  flex: 1,
  backgroundColor: app_colors.ligth_bg,
  justifyContent: "space-around",
  padding: 5,
};

export const add_guest: any = {
  width: "15%",
  backgroundColor: "white",
  elevation: 5,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
};

export const guest_input_container: any = {
  width: "100%",
};

export const guest_row: any = {
  flexDirection: "row",
  justifyContent: "space-between",
};

export const guest_input: any = {
  width: "60%",
  height: 30,
  borderBottomColor: "gray",
  borderRadius: 5,
  marginTop: 5,
  marginBottom: 5,
  backgroundColor: app_colors.white,
  fontSize: 12,
  padding: 5,
  color: app_colors.text_gray,
};
