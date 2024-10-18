import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity, View } from "react-native";
import { ic_fc, ic_fs, styles } from "./styles.default";

type TFilterProps = {
  position?: "left" | "right" | "center";
  icon?: React.ReactNode | React.ReactElement;
  onPressCallback?: () => void;
  drawerComponent?: React.ReactNode | React.ReactElement;
};

export const Filters = (props: TFilterProps) => {
  const handlePress = () => {
    console.info("Filters::COMP::Filter pressed");
    props.onPressCallback && props.onPressCallback();
  };

  return (
    <View style={[styles.filterContainer, styles[props.position || "right"]]}>
      <TouchableOpacity onPress={handlePress}>{props.icon}</TouchableOpacity>
    </View>
  );
};

Filters.defaultProps = {
  position: "right",
  icon: <AntDesign name="filter" size={ic_fs} color={ic_fc} />,
  onPressCallback: undefined,
  drawerComponent: null,
};
