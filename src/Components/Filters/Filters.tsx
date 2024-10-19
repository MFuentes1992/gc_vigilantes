import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity, View } from "react-native";
import { ic_fc, ic_fs, styles } from "./styles.default";

type TFilterProps = {
  position?: "left" | "right" | "center";
  icon?: React.ElementType<any>;
  onPressCallback?: () => void;
  drawerComponent: React.ElementType<any>;
};

export const Filters = (props: TFilterProps) => {
  const handlePress = () => {
    console.info("Filters::COMP::Filter pressed");
    props.onPressCallback && props.onPressCallback();
  };

  return (
    <>
      <View style={[styles.filterContainer, styles[props.position || "right"]]}>
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.filterIcon}>
            {props.icon && (
              <props.icon name="filter" size={ic_fs} color={ic_fc} />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.drawer}>
        <props.drawerComponent />
      </View>
    </>
  );
};

Filters.defaultProps = {
  position: "right",
  icon: AntDesign,
  onPressCallback: undefined,
};
