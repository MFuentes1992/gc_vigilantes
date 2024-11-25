import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { Text, View } from "react-native";
import { card_styles } from "./constants";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { GuestPicker } from "@gcVigilantes/Components/GuestPicker/GuestPicker";
import { GuestInfoProps } from "./constants";
import { getLabelApp } from "@gcVigilantes/utils";
import { addVehicleNotificationsStyles } from "@gcVigilantes/Components/AddVehicle/constants";

export const GuestInfo = ({
  estatus,
  peatones,
  errorValidator,
  handleOnChange,
}: GuestInfoProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  return (
    <>
      {Object.hasOwn(errorValidator, "peatones") &&
        errorValidator.peatones.required && (
          <View style={[addVehicleNotificationsStyles.container]}>
            <Text style={[addVehicleNotificationsStyles.text]}>
              {getLabelApp(preferences.language, "app_empty_pedestrians")}
            </Text>
          </View>
        )}
      <View style={card_styles}>
        <CardTitle
          title={getLabelApp(
            preferences.language,
            "app_screen_visit_info_pedestrians_title",
          )}
          uppercase
        />
        <GuestPicker
          estatus={estatus}
          peatones={peatones}
          handleOnChange={handleOnChange}
        />
      </View>
    </>
  );
};
