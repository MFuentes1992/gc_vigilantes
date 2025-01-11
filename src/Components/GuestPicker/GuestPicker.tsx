import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Fontisto from "@expo/vector-icons/Fontisto";
import {
  add_guest,
  guest_input,
  guest_input_container,
  guest_row,
  guestpicker_contaier,
} from "./constants";
import { getLabelApp } from "@gcVigilantes/utils";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { addVehicleNotificationsStyles } from "../AddVehicle/constants";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import {
  app_text_body,
  app_text_h3,
  app_text_title_normal,
} from "@gcVigilantes/utils/default.styles";
import { VisitaPeaton } from "@gcVigilantes/store/Visita/types";
import { pill_styles } from "../EditVehicles/constants";

export const GuestPicker = ({
  peatones,
  estatus,
  onViewAttachments,
  onOpenLibrary,
  handleOnChange,
}: {
  estatus: boolean;
  peatones: VisitaPeaton[];
  onViewAttachments: (id: string) => void;
  onOpenLibrary: (id: string) => void;
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
        idVisita: Math.random().toString(36).substr(2, 9),
        nombre: "",
        fechaRegistro: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
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
              {estatus && (
                <TouchableOpacity
                  style={pill_styles}
                  onPress={() => onOpenLibrary(pedestrian.id)}
                >
                  <Text
                    style={[
                      app_text_title_normal,
                      {
                        color: app_colors.text_gray,
                        display: "flex",
                        alignItems: "flex-start",
                      },
                    ]}
                  >
                    <Fontisto
                      name="plus-a"
                      size={app_text_body.fontSize}
                      color={app_colors.text_gray}
                    />
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  {
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: 200,
                    marginLeft: 10,
                  },
                ]}
                onPress={() => {
                  onViewAttachments(pedestrian.id);
                }}
              >
                <Fontisto
                  name="picture"
                  style={{ marginRight: 10 }}
                  size={app_text_h3.fontSize}
                  color={app_colors.text_gray}
                />
                <Text
                  style={[
                    app_text_body,
                    {
                      color: app_colors.text_gray,
                      display: "flex",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  {pedestrian.attachedFiles?.length || []}
                </Text>
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
