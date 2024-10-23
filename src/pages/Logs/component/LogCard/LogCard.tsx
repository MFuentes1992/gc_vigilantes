import React from "react";
import { View, Text } from "react-native";
import { styles } from "@gcVigilantes/pages/Logs/component/constants/style.default";
import { TipoVisitasIcon } from "@gcVigilantes/pages/VisitaInfo/MainInfo";
import {
  app_text_body,
  app_text_h3,
  app_text_property,
} from "@gcVigilantes/utils/default.styles";

type TLogCardProps = {
  date: string;
  time: string;
  address: string;
  name: string;
  type: string;
  ingress: string;
};

export const LogCard = (props: TLogCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.left_color_strip}></View>
      <View style={styles.right_content}>
        <View style={styles.row}>
          <Text style={app_text_h3}>{props.date}</Text>
          {TipoVisitasIcon[props.ingress] as unknown as React.ReactNode}
        </View>
        <View style={styles.row}>
          <View style={{ flexDirection: "row" }}>
            <Text style={app_text_body}>{props.time} hrs&nbsp;</Text>
            <Text style={app_text_property}>({props.type})</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text>
            {props.address} - {props.name}
          </Text>
        </View>
      </View>
    </View>
  );
};
