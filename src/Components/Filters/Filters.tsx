import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity, View } from "react-native";
import {
  ic_fc,
  ic_fs,
  slideInRight,
  slideOutRight,
  styles,
} from "./styles.default";
import * as Animatable from "react-native-animatable";

type TFilterProps = {
  position?: "left" | "right" | "center";
  icon?: React.ElementType<any>;
  onPressCallback?: () => void;
  drawerComponent: React.ElementType<any>;
};

export const Filters = (props: TFilterProps) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const handlePress = () => {
    console.info("Filters::COMP::Filter pressed");
    props.onPressCallback && props.onPressCallback();
    setDrawerVisible(!drawerVisible);
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
      {true && (
        <Animatable.View
          animation={drawerVisible ? slideInRight : slideOutRight}
          duration={500}
          style={styles.drawer}
        >
          <props.drawerComponent />
        </Animatable.View>
      )}
    </>
  );
};

Filters.defaultProps = {
  position: "right",
  icon: AntDesign,
  onPressCallback: undefined,
};
