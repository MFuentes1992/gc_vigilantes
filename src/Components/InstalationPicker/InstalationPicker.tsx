import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { CardTitle } from "../CardTitle/CardTitle";
import { Picker } from "@react-native-picker/picker";
import { InstalationPickerProps } from "./constants";
import { Instalacion } from "@gcVigilantes/store/Vigilancia/types";
import { getLabelApp } from "@gcVigilantes/utils";

export const InstalationPicker = (props: InstalationPickerProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const [value, setValue] = useState<string>(
    JSON.stringify(props.selectedInstalacion),
  );

  const handleOnChange = (value: string) => {
    setValue(value);
    props.handleOnChange(value);
  };

  return (
    <>
      <CardTitle
        title={getLabelApp(
          preferences.language,
          "app_screen_visit_info_pick_instalation",
        )}
        uppercase
      />
      <Picker selectedValue={value} onValueChange={handleOnChange}>
        {[
          ...props.instalaciones,
          {
            idInstalacion: "",
            idUsuario: "",
            seccion: "",
            numInt: "",
            owner: "",
          },
        ].map((instalacion: Instalacion) => (
          <Picker.Item
            key={instalacion.idInstalacion}
            label={`${instalacion.seccion}${instalacion.numInt} - ${instalacion.owner}`}
            value={JSON.stringify(instalacion)}
          />
        ))}
      </Picker>
    </>
  );
};
