import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  VisitaDetailsProps,
  badge_colors,
  defaultRow,
  details_badge,
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
  newVisita,
  handleChangeTab,
}: VisitaDetailsProps) => {
  return (
    <>
      {!newVisita && (
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
                style={[
                  details_badge,
                  { backgroundColor: badge_colors[estatus] },
                ]}
              >
                <Text style={details_badge_text}>{estatus}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
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
          onPress={() => handleChangeTab(TABS.VEHICLES)}
        >
          <MaterialCommunityIcons
            name="car-arrow-right"
            size={18}
            color={
              selectedTab === TABS.VEHICLES
                ? app_colors.third
                : app_colors.ligth_bg
            }
          />
          <Text
            style={[
              app_text_menu,
              {
                color:
                  selectedTab === TABS.VEHICLES
                    ? app_colors.third
                    : app_colors.text_gray,
              },
            ]}
          >
            VEHICULOS
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
            PEATONES
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
VisitaDetails.defaultProps = {
  newVisita: false,
  handleChangeTab: () => {},
  handleNotificaciones: () => {},
};
