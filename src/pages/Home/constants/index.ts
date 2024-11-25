import { hourFormat, timeZone } from "@gcVigilantes/utils";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { StyleSheet } from "react-native";

export type THome = {
  date: string;
  logoUrl: string;
  residenceName: string;
  residenceAddress: string;
  residenceMobile: string;
  residencePhone: string;
  residenceExt: string;
};

export const INITIAL_STATE: THome = {
  date: `${new Date().toLocaleString(timeZone, {
    month: "long",
    day: "numeric",
    hour12: true,
  })}, ${hourFormat(new Date().getTime())}`,
  logoUrl: "https://via.placeholder.com/150",
  residenceName: "",
  residenceAddress: "",
  residenceMobile: "",
  residencePhone: "",
  residenceExt: "",
};

export const HomeScreenStyles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  dateDisplay: {
    position: "relative",
    width: "100%",
    height: "10%",
    display: "flex",
    paddingRight: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    position: "relative",
    width: "100%",
    display: "flex",
    paddingTop: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footer: {
    position: "relative",
    width: "100%",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
