import React, { useEffect } from "react";
import { TextInput, View } from "react-native";
import { inputStyles } from "./constants";
import { CardTitle } from "../CardTitle/CardTitle";
import { card_styles_extended } from "@gcVigilantes/pages/VisitaInfo/constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { HeaderActionButton } from "../HeaderActionButton/HeaderActionButton";

type EditVehiclesProps = {
  id: string;
  driver: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  handleOnChange: (id: string, key: string, value: string) => void;
  handleClose: () => void;
};

export const EditVehicles = ({
  id,
  brand,
  driver,
  model,
  year,
  color,
  plate,
  handleOnChange,
  handleClose,
}: EditVehiclesProps) => {
  return (
    <View key="container-edit-vehicle" style={card_styles_extended}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "5%",
          marginBottom: "2%",
        }}
      >
        <HeaderActionButton
          icon="times-circle"
          color={app_colors.ligth_bg}
          onPress={handleClose}
        />
      </View>
      <TextInput
        style={inputStyles}
        onChangeText={(driver: string) =>
          handleOnChange(id, "conductor", driver)
        }
        value={driver}
        placeholder="Conductor"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(brand: string) => handleOnChange(id, "marca", brand)}
        value={brand}
        placeholder="Marca del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(model: string) => handleOnChange(id, "modelo", model)}
        value={model}
        placeholder="Modelo del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(year: string) => handleOnChange(id, "anio", year)}
        value={year}
        placeholder="Año del vehículo"
        keyboardType="numeric"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(color: string) => handleOnChange(id, "color", color)}
        value={color}
        placeholder="Color del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(plate: string) => handleOnChange(id, "placas", plate)}
        value={plate}
        placeholder="Matrícula del vehículo"
      />
    </View>
  );
};
