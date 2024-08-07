import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { Switcher } from "@gcVigilantes/Components/Switcher/Switcher";
import React from "react";
import { View, Text } from "react-native";
import { card_styles, settingsInfoProps } from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const SettingsInfo = (props: settingsInfoProps) => {
  return (
    <>
      <View style={card_styles}>
        <CardTitle title="Informacion" uppercase />
        <View
          style={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text>{`Autor: `}</Text>
            <Text
              style={{
                color: app_colors.text_gray,
                fontSize: 12,
                marginLeft: "5%",
              }}
            >
              {props.autor}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text>{`UniqueID:`}</Text>
            <Text
              style={{
                color: app_colors.text_gray,
                fontSize: 12,
                marginLeft: "2%",
              }}
            >
              {props.uniqueID}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Text>{`Seccion:`}</Text>
            <Text
              style={{
                color: app_colors.text_gray,
                fontSize: 12,
                marginLeft: "2%",
              }}
            >
              {props.seccion}
            </Text>
            <Text style={{ marginLeft: "2%" }}>{`Num_Int:`}</Text>
            <Text
              style={{
                color: app_colors.text_gray,
                fontSize: 12,
                marginLeft: "2%",
              }}
            >
              {props.num_int}
            </Text>
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
            props.handleOnchange("multiple_entrada", value ? "1" : "0")
          }
        />
      </View>
    </>
  );
};
