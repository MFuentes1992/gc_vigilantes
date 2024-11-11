import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { Switcher } from "@gcVigilantes/Components/Switcher/Switcher";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import React from "react";
import { View, Text } from "react-native";
import { card_styles, row_styles, settingsInfoProps } from "./constants";
import { getLabelApp } from "@gcVigilantes/utils";
import {
  app_text_property,
  app_text_subtitle,
} from "@gcVigilantes/utils/default.styles";

export const SettingsInfo = (props: settingsInfoProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  return (
    <>
      <View style={card_styles}>
        <View style={row_styles.container}>
          <View style={row_styles.column}>
            <Text style={app_text_subtitle}>
              {getLabelApp(
                preferences.language,
                "app_screen_visit_info_settings_autor"
              )}
            </Text>
          </View>
          <View style={row_styles.column}>
            <Text style={app_text_property}>{props.autor}</Text>
          </View>
        </View>

        <View style={row_styles.container}>
          <View style={row_styles.column}>
            <Text style={app_text_subtitle}>
              {getLabelApp(
                preferences.language,
                "app_screen_visit_info_settings_instalacion"
              )}
            </Text>
          </View>
          <View style={row_styles.column}>
            <Text
              style={app_text_property}
            >{`${props.seccion}${props.num_int}`}</Text>
          </View>
        </View>
      </View>

      <View style={card_styles}>
        <CardTitle title="Ajustes generales" uppercase />
        <Switcher
          title="Notificaciones:"
          value={props.notificaciones}
          handleOnChange={(value: boolean) =>
            props.handleOnchange("notificaciones", value ? "1" : "0")
          }
        />

        <Switcher
          title="Multiple entrada:"
          value={props.multiple_entrada}
          handleOnChange={(value: boolean) =>
            props.handleOnchange("multiple", value ? "1" : "0")
          }
        />
      </View>
    </>
  );
};
