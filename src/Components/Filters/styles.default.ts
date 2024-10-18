import { StyleSheet } from "react-native";

export const ic_fs = 18;
export const ic_fc = "black";

export const styles: { [key: string]: any } = StyleSheet.create({
  filterContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
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
    width: 30,
    height: 30,
  },
});
