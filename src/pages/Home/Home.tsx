import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { View, Text, Image } from "react-native";
import { HomeScreenStyles, INITIAL_STATE, THome } from "./constants";
import { datePoller, hourFormat, getLabelApp } from "@gcVigilantes/utils";
import {
  app_text_h2,
  app_text_h3,
  app_text_subtitle,
  app_text_title,
} from "@gcVigilantes/utils/default.styles";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const Home = () => {
  const [homeData, setHomeData] = useState<THome>(INITIAL_STATE);
  const intervalRef = React.useRef<any>();
  const preferences = useSelector((state: RootState) => state.preferences);

  useEffect(() => {
    const interval = datePoller(() => {
      const time = hourFormat(new Date().getTime());
      setHomeData((prev) => ({
        ...homeData,
        date: prev.date.replace(/\d{1,2}:\d{1,2}\s?(AM|PM)?/, time),
      }));
    });
    intervalRef.current = interval; // Save the interval reference
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.dateDisplay}>
        <Text style={[app_text_subtitle]}>{homeData.date}</Text>
      </View>
      <View style={[HomeScreenStyles.imageContainer]}>
        <Image
          src={homeData.logoUrl}
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
          }}
        />
      </View>
      <View style={HomeScreenStyles.body}>
        <Text style={[app_text_h2, { color: app_colors.black }]}>
          {homeData.residenceName}
        </Text>
        <Text
          style={[app_text_h3, { width: "80%", color: app_colors.text_gray }]}
        >
          {homeData.residenceAddress}
        </Text>
      </View>
      <View style={HomeScreenStyles.footer}>
        <Text style={[app_text_title, { color: app_colors.black }]}>
          {`${getLabelApp(preferences.language, "app_mobile_number_mobile")}: ${
            homeData.residenceMobile
          }`}
        </Text>
        <Text style={[app_text_title, { color: app_colors.black }]}>
          {`${getLabelApp(preferences.language, "app_mobile_number_phone")}: ${
            homeData.residencePhone
          }`}
        </Text>
        <Text style={[app_text_title, { color: app_colors.black }]}>
          {`${getLabelApp(preferences.language, "app_mobile_number_ext")}: ${
            homeData.residenceExt
          }`}
        </Text>
      </View>
    </View>
  );
};
