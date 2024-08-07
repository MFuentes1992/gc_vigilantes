import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  VisitaDetailsProps,
  defaultRow,
  details_badge_active,
  details_badge_inactive,
  details_badge_text,
  details_container,
  details_info,
  details_menu,
} from "./constants";
import {
  app_text_body,
  app_text_menu,
  app_text_property,
} from "@gcVigilantes/utils/default.styles";
import { TABS } from "@gcVigilantes/pages/VisitaInfo/constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const VisitaDetails = ({
  uri,
  autor,
  emailAutor,
  estatus,
  num_int,
  seccion,
  direccion,
  selectedTab,
  handleChangeTab,
}: VisitaDetailsProps) => {
  return (
    <>
      <View style={details_container}>
        <Image
          width={100}
          height={100}
          source={{
            uri: uri,
          }}
        />
        <View style={details_info}>
          <Text style={app_text_body}>{autor}</Text>
          <Text style={[app_text_body, { color: app_colors.text_dark }]}>
            {emailAutor}
          </Text>
          <View style={defaultRow}>
            <Text style={app_text_property}>Num Int:</Text>
            <Text style={app_text_body}>{num_int}</Text>
            <Text style={app_text_property}>Seccion:</Text>
            <Text style={app_text_body}>{seccion}</Text>
          </View>
          <Text style={app_text_body}>{direccion}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={estatus ? details_badge_active : details_badge_inactive}
            >
              <Text style={details_badge_text}>
                {estatus ? "Activa" : "Inactiva"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={details_menu}>
        <TouchableOpacity
          style={{
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleChangeTab(TABS.MAIN)}
        >
          <MaterialCommunityIcons
            name="file-document-multiple"
            size={18}
            color={
              selectedTab === TABS.MAIN ? app_colors.third : app_colors.ligth_bg
            }
          />
          <Text
            style={[
              app_text_menu,
              {
                color:
                  selectedTab === TABS.MAIN
                    ? app_colors.third
                    : app_colors.text_gray,
              },
            ]}
          >
            RESUMEN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleChangeTab(TABS.DATE)}
        >
          <FontAwesome
            name="calendar"
            size={18}
            color={
              selectedTab === TABS.DATE ? app_colors.third : app_colors.ligth_bg
            }
          />
          <Text
            style={[
              app_text_menu,
              {
                color:
                  selectedTab === TABS.DATE
                    ? app_colors.third
                    : app_colors.text_gray,
              },
            ]}
          >
            FECHAS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleChangeTab(TABS.GUEST)}
        >
          <MaterialIcons
            name="people-alt"
            size={18}
            color={
              selectedTab === TABS.GUEST
                ? app_colors.third
                : app_colors.ligth_bg
            }
          />
          <Text
            style={[
              app_text_menu,
              {
                color:
                  selectedTab === TABS.GUEST
                    ? app_colors.third
                    : app_colors.text_gray,
              },
            ]}
          >
            INVITADOS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingTop: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => handleChangeTab(TABS.SETTINGS)}
        >
          <MaterialIcons
            name="settings"
            size={18}
            color={
              selectedTab === TABS.SETTINGS
                ? app_colors.third
                : app_colors.ligth_bg
            }
          />
          <Text
            style={[
              app_text_menu,
              {
                color:
                  selectedTab === TABS.SETTINGS
                    ? app_colors.third
                    : app_colors.text_gray,
              },
            ]}
          >
            AJUSTES
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
