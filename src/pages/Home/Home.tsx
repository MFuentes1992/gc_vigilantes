import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { View, Text, Image, BackHandler } from "react-native";
import { HomeScreenStyles, INITIAL_STATE, THome } from "./constants";
import {
  datePoller,
  hourFormat,
  getLabelApp,
  ENDPOINTS,
  ROUTES,
} from "@gcVigilantes/utils";
import {
  app_text_h2,
  app_text_h3,
  app_text_subtitle,
  app_text_title,
  app_text_title_normal,
} from "@gcVigilantes/utils/default.styles";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { getCasetaInfo } from "@gcVigilantes/store/Vigilancia/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearCasetaInfo } from "@gcVigilantes/store/Vigilancia";
import { setScreen } from "@gcVigilantes/store/Pagination";

export const Home = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [homeData, setHomeData] = useState<THome>(INITIAL_STATE);
  const intervalRef = React.useRef<any>();
  const preferences = useSelector((state: RootState) => state.preferences);
  const casetaInfo = useSelector((state: RootState) => state.vigilancia);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      if (e.data.action.type != "GO_BACK") {
        e.preventDefault();
      }
    });
    navigation.addListener("focus", (e: any) => {
      dispatch(setScreen(ROUTES.HOME));
    });
  }, []);

  useEffect(() => {
    if ([""].includes(casetaInfo.residenceName)) {
      AsyncStorage.getItem("Access_Code")
        .then((code) => {
          dispatch(getCasetaInfo(code || "") as any);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setHomeData((prev) => ({
        residenceAddress: casetaInfo.residenceAddress,
        residenceExt: casetaInfo.residenceExt,
        residenceMobile: casetaInfo.residenceMobile,
        residenceName: casetaInfo.residenceName,
        residencePhone: casetaInfo.residencePhone,
        logoUrl: `${ENDPOINTS.WEB_SERVER}/${casetaInfo.logoUrl}`,
        date: prev.date,
      }));
      const interval = datePoller(() => {
        const time = hourFormat(new Date().getTime());
        setHomeData((prev) => ({
          ...prev,
          date: prev.date.replace(/\d{1,2}:\d{1,2}\s?(AM|PM)?/, time),
        }));
      });
      // Save the interval reference
      intervalRef.current = interval;
    }
    return () => {
      clearInterval(intervalRef.current);
      dispatch(clearCasetaInfo());
    };
  }, [casetaInfo.logoUrl]);

  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.dateDisplay}>
        <Text style={[app_text_title_normal]}>{homeData.date}</Text>
      </View>
      <View style={[HomeScreenStyles.imageContainer]}>
        <Image
          source={{ uri: homeData.logoUrl }}
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
        <Text style={[app_text_title_normal, { color: app_colors.black }]}>
          {`${getLabelApp(preferences.language, "app_mobile_number_mobile")}: ${
            homeData.residenceMobile
          }`}
        </Text>
        <Text style={[app_text_title_normal, { color: app_colors.black }]}>
          {`${getLabelApp(preferences.language, "app_mobile_number_phone")}: ${
            homeData.residencePhone
          }`}
        </Text>
        <Text style={[app_text_title_normal, { color: app_colors.black }]}>
          {`${getLabelApp(preferences.language, "app_mobile_number_ext")}: ${
            homeData.residenceExt
          }`}
        </Text>
      </View>
    </View>
  );
};
