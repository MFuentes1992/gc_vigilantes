import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { View } from "react-native";
import { card_styles } from "./constants";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { GuestPicker } from "@gcVigilantes/Components/GuestPicker/GuestPicker";
import { GuestInfoProps } from "./constants";
import { getLabelApp } from "@gcVigilantes/utils";

export const GuestInfo = ({
  estatus,
  peatones,
  handleOnChange,
}: GuestInfoProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  return (
    <View style={card_styles}>
      <CardTitle
        title={getLabelApp(
          preferences.language,
          "app_screen_visit_info_pedestrians_title"
        )}
        uppercase
      />
      <GuestPicker
        estatus={estatus}
        peatones={peatones}
        handleOnChange={handleOnChange}
      />
    </View>
  );
};
