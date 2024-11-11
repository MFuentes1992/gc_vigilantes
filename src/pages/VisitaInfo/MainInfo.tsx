import React, { useState } from "react";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";

import { TextInput, View, Text } from "react-native";
import { MainInfoProps, card_styles } from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { InstalationPicker } from "@gcVigilantes/Components/InstalationPicker/InstalationPicker";
import { Instalacion } from "@gcVigilantes/store/Vigilancia/types";

export const TipoVisitasIcon: { [key: string]: React.ReactNode } = {
  ["1"]: <FontAwesome name="user" size={18} color="darkgray" />,
  ["3"]: <FontAwesome name="truck" size={18} color="darkgray" />,
  ["2"]: <FontAwesome name="wrench" size={18} color="darkgray" />,
  ["Vehículo"]: <FontAwesome name="car" size={24} color="darkgray" />,
  Peatonal: <FontAwesome5 name="walking" size={24} color="darkgray" />,
  single: <FontAwesome name="user" size={24} color="darkgray" />,
  multiple: (
    <MaterialCommunityIcons
      name="account-multiple-plus"
      size={24}
      color="black"
    />
  ),
};

export const MainInfo = ({
  tipoVisita,
  tipoIngreso,
  nombreVisita,
  catalogVisitas,
  catalogIngreso,
  estatus,
  newVisita,
  selectedInstalacion,
  instalaciones,
  handleOnChange,
}: MainInfoProps) => {
  // -- Disabling and enabling Cards
  const [tipoVisitaDisabled, setTipoVisitaDisabled] = useState<boolean>(
    !newVisita
  );
  const [tipoIngresoDisabled, setTipoIngresoDisabled] = useState<boolean>(
    !newVisita
  );
  const [nombreVisitaDisabled, setNombreVisitaDisabled] = useState<boolean>(
    !newVisita
  );

  const handleOnChangeInstalacion = (_instalacion: string) => {
    const instalacion = JSON.parse(_instalacion) as Instalacion;
    const idInstalacion = instalacion.idInstalacion;
    handleOnChange("idInstalacion", idInstalacion);
    const idUsuario = instalacion.idUsuario;
    handleOnChange("idUsuario", idUsuario);
    const owner = instalacion.owner;
    handleOnChange("autor", owner);
    const seccion = instalacion.seccion;
    handleOnChange("residencialSeccion", seccion);
    const numInt = instalacion.numInt;
    handleOnChange("residencialNumInterior", numInt);
  };

  return (
    <View>
      <InstalationPicker
        instalaciones={instalaciones}
        selectedInstalacion={selectedInstalacion}
        handleOnChange={handleOnChangeInstalacion}
      />
      <View style={card_styles}>
        <CardTitle
          title="tipo de visita"
          uppercase
          editIcon={estatus !== 0}
          handleEdit={() => setTipoVisitaDisabled(false)}
        />
        <RadioGroup
          selectedValue={tipoVisita}
          disabled={tipoVisitaDisabled}
          options={catalogVisitas.map((catalog) => ({
            id: catalog.id,
            label: catalog.tipo_visita,
            icon: TipoVisitasIcon[catalog.id] as unknown as React.ReactNode,
          }))}
          handleChange={(value: string) => {
            handleOnChange("idTipoVisita", value);
          }}
        />
      </View>
      <View style={card_styles}>
        <CardTitle
          title="Nombre"
          uppercase
          editIcon={estatus !== 0}
          handleEdit={() => setNombreVisitaDisabled(false)}
        />
        {nombreVisitaDisabled && (
          <Text style={{ color: app_colors.text_dark, left: 10 }}>
            {nombreVisita}
          </Text>
        )}
        {!nombreVisitaDisabled && (
          <TextInput
            style={{
              width: "90%",
              height: 40,
              borderBottomColor: "gray",
              borderBottomWidth: 0.5,
              left: 10,
              color: app_colors.text_dark,
            }}
            value={nombreVisita}
            placeholder="Ingrese aqui el nombre de la visita"
            onChangeText={(value: string) => {
              handleOnChange("nombre", value);
            }}
            autoCapitalize="words"
            maxLength={50}
          />
        )}
      </View>
      <View
        style={[
          card_styles,
          {
            marginBottom: 0,
            zIndex: 1,
          },
        ]}
      >
        <CardTitle
          title="Tipo ingreso"
          uppercase
          editIcon={estatus !== 0}
          handleEdit={() => setTipoIngresoDisabled(false)}
        />
        <RadioGroup
          options={catalogIngreso.map((catalog) => ({
            id: catalog.id,
            label: catalog.tipo_ingreso,
            icon: TipoVisitasIcon[
              catalog.tipo_ingreso
            ] as unknown as React.ReactNode,
          }))}
          selectedValue={tipoIngreso}
          disabled={tipoIngresoDisabled}
          handleChange={(value: string) => {
            handleOnChange("idTipoIngreso", value);
          }}
        />
      </View>
    </View>
  );
};

MainInfo.defaultProps = {
  catalogVisitas: [],
  catalogIngreso: [],
  tipoVisita: "",
  tipoIngreso: "",
  nombreVisita: "",
  visitVehicles: [],
  estatus: 0,
  newVisita: false,
  handleOnChange: () => {},
};
