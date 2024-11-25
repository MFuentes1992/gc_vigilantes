import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  add_guest,
  guest_input,
  guest_input_container,
  guest_row,
  guestpicker_contaier,
} from "./constants";
import { getLabelApp } from "@gcVigilantes/utils";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { VisitaPeaton } from "@gcVigilantes/pages/VisitaInfo/constants";
import { addVehicleNotificationsStyles } from "../AddVehicle/constants";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";

export const GuestPicker = ({
  peatones,
  estatus,
  handleOnChange,
}: {
  estatus: boolean;
  peatones: VisitaPeaton[];
  handleOnChange: (key: string, value: VisitaPeaton[]) => void;
}) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const handleTextChange = (id: string, value: string) => {
    const peaton = peatones.find((peaton) => peaton?.id === id);
    const filteredPeatones = peatones.filter((peaton) => peaton?.id !== id);
    if (peaton) {
      const tmp = { ...peaton, nombre: value };
      filteredPeatones.push(tmp);
      handleOnChange("peatones", filteredPeatones);
    }
  };

  const handleAddGuest = (estatus: boolean) => {
    if (estatus) {
      const tmp: VisitaPeaton = {
        id: Math.random().toString(36).substr(2, 9),
        nombre: "",
        estatusRegistro: 1,
      };
      handleOnChange("peatones", [...peatones, tmp]);
    }
  };

  const handleRemoveGuest = (id: string) => {
    const filteredPeatones = peatones.filter((peaton) => peaton.id !== id);
    handleOnChange("peatones", filteredPeatones);
  };

  return (
    <View style={guestpicker_contaier}>
      <TouchableOpacity
        style={add_guest}
        onPress={() => handleAddGuest(estatus)}
      >
        <AntDesign
          name="adduser"
          size={24}
          color={estatus ? app_colors.secondary_badge : app_colors.text_gray}
        />
      </TouchableOpacity>
      <View style={guest_input_container}>
        {peatones.map((pedestrian, index) => {
          return (
            <View style={guest_row}>
              <TextInput
                key={index}
                value={pedestrian.nombre}
                style={guest_input}
                placeholder="Nombre del invitado"
                onChangeText={(value: string) =>
                  handleTextChange(pedestrian.id, value)
                }
              />
              <TouchableOpacity
                onPress={() => handleRemoveGuest(pedestrian.id)}
              >
                <AntDesign
                  name="close"
                  size={18}
                  color="black"
                  style={{ marginTop: "50%", color: app_colors.text_gray }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

GuestPicker.defaultProps = {
  guests: [],
  handlePicker: () => {},
};
