import React from "react";
import { View } from "react-native";
import { card_styles } from "./constants";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { GuestPicker } from "@gcVigilantes/Components/GuestPicker/GuestPicker";
import { GuestInfoProps } from "./constants";

export const GuestInfo = ({
  estatus,
  peatones,
  handleOnChange,
}: GuestInfoProps) => {
  return (
    <View style={card_styles}>
      <CardTitle title="Agregar acompanantes" uppercase />
      <GuestPicker
        estatus={estatus}
        peatones={peatones}
        handleOnChange={handleOnChange}
      />
    </View>
  );
};
