import { StyleSheet } from "react-native";

export const styles: { [key: string]: any } = StyleSheet.create({
  trashBin: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    zIndex: 100,
    width: 30,
  },
});
