import React, { useEffect, useState } from "react";
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
import { Drawer, TFilter } from "./Drawer/Drawer";

type TFilterProps = {
  position?: "left" | "right" | "center";
  icon?: React.ElementType<any>;
  onPressCallback?: () => void;
  drawerCallback: (_v: TFilter) => void;
};

export const Filters = (props: TFilterProps) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const handlePress = () => {
    console.info("Filters::COMP::Filter pressed");
    props.onPressCallback && props.onPressCallback();
    setDrawerVisible(!drawerVisible);
  };

  const handleApply = (values: TFilter) => {
    console.info("Filters::COMP::handleApply::", values);
    setDrawerVisible(false);
    props.drawerCallback(values);
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
      <Animatable.View
        animation={drawerVisible ? slideInRight : slideOutRight}
        duration={500}
        style={styles.drawer}
      >
        <Drawer onApply={handleApply} />
      </Animatable.View>
    </>
  );
};

Filters.defaultProps = {
  position: "right",
  icon: AntDesign,
  onPressCallback: undefined,
};
