import { app_colors } from "@gcVigilantes/utils/default.colors";
import { Dimensions, StyleSheet } from "react-native";

export const ic_fs = 24;
export const ic_fc = app_colors.text_gray;

export const styles: { [key: string]: any } = StyleSheet.create({
  filterContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    height: 35,
    paddingRight: 5,
  },
  left: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    position: "relative",
    top: 5,
    width: 100,
    height: 35,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: app_colors.white,
    elevation: 10,
    color: app_colors.primary,
  },
  drawer: {
    position: "absolute",
    width: "100%",
    height: "auto",
    maxHeight: "68%",
    margin: "auto",
    bottom: 0 - Dimensions.get("window").height / 1,
    zIndex: 100,
    backgroundColor: app_colors.white,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopColor: app_colors.text_dark,
    borderWidth: 1,
    elevation: 10,
  },
});

export const slideInRight = {
  from: {
    bottom: 0 - Dimensions.get("window").height / 1,
  },
  to: {
    bottom: 0,
  },
};

export const slideOutRight = {
  from: {
    bottom: 0,
  },
  to: {
    bottom: 0 - Dimensions.get("window").height / 1,
  },
};
