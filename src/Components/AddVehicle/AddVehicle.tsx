import React from "react";
import { View } from "react-native";
import { HeaderActionButton } from "../HeaderActionButton/HeaderActionButton";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { vehicleCardStyles } from "./constants";

type AddVehicleProps = {
  onPress: () => void;
};

export const AddVehicle = (props: AddVehicleProps) => {
  return (
    <View style={vehicleCardStyles.container}>
      <HeaderActionButton
        icon="plus"
        color={app_colors.secondary_badge_vivid}
        onPress={props.onPress}
      />
    </View>
  );
};
