import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  container,
  container_animation,
  formRules,
  submit_button,
  title_container,
} from "./constants";
import { RootState } from "@gcVigilantes/store";
import {
  LOCAL_STORAGE_KEYS,
  ROUTES,
  getLabelApp,
  loadAsyncStorageData,
} from "@gcVigilantes/utils";

import { setUserData } from "@gcVigilantes/store/UserData";
import { app_text_title } from "@gcVigilantes/utils/default.styles";
import { card_styles } from "../VisitaInfo/constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { useFormValidator } from "@gcVigilantes/Components/hooks/customFormValidator";
import {
  threeWayAuthentication,
  twoWayAuthentication,
} from "@gcVigilantes/store/Login/api";
import { setScreen } from "@gcVigilantes/store/Pagination";

export const ActivationCode = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { errors: formErrors, setFormData: setData } =
    useFormValidator(formRules);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const preferences = useSelector((state: RootState) => state.preferences);

  useEffect(() => {
    setLoading(true);
    loadAsyncStorageData(
      Object.keys(LOCAL_STORAGE_KEYS).map((key) => LOCAL_STORAGE_KEYS[key]),
      AsyncStorage
    )
      .then((lsResult) => {
        const [instalationToken, accessCode, dbCode, idCaseta] = lsResult;
        dispatch(
          setUserData({
            access_token: instalationToken.Instalation_Token.toString() || "",
            database_code: dbCode.DB_Code.toString() || "",
            access_code: accessCode.Access_Code.toString() || "",
            id_caseta: Number.parseInt(idCaseta?.id_caseta?.toString() || "0"),
            name: "",
            residence: "",
            id: "",
          }) as any
        );
        dispatch(
          twoWayAuthentication(
            dbCode?.DB_Code.toString() || "",
            accessCode?.Access_Code.toString() || "",
            navigation,
            () => setLoading(false)
          ) as any
        );
      })
      .catch((error) => {
        setLoading(false);
      });
    navigation.addListener("focus", () => {
      dispatch(setScreen(ROUTES.ACTIVATION_CODE));
    });
  }, []);

  useEffect(() => {
    setData(formData);
  }, [formData]);

  const handleTextChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDataBaseChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (formErrors.length) return;
    setLoading(true);
    dispatch(
      threeWayAuthentication(
        formData.dataBaseCode,
        formData.activationCode,
        navigation,
        () => setLoading(false)
      ) as any
    );
  };

  return (
    <ScrollView>
      {!loading && (
        <View style={container}>
          <View style={title_container}>
            <Text style={app_text_title}>
              {getLabelApp(preferences.language, "app_activation_code")}
            </Text>
          </View>
          <View style={card_styles}>
            <TextInput
              style={{
                fontSize: 16,
                height: 40,
                padding: 10,
              }}
              value={formData.activationCode}
              onChangeText={(value) =>
                handleTextChange("activationCode", value)
              }
              placeholder={getLabelApp(
                preferences.language,
                "app_activation_code_placeholder"
              )}
            />
            <Text style={[]}>{formErrors["activationCode"]}</Text>
          </View>
          <View style={card_styles}>
            <TextInput
              style={{
                fontSize: 16,
                height: 40,
                padding: 10,
              }}
              value={formData.dataBaseCode}
              onChangeText={(value) =>
                handleDataBaseChange("dataBaseCode", value)
              }
              placeholder={getLabelApp(
                preferences.language,
                "app_database_code"
              )}
            />
            <Text style={[]}>{formErrors["dataBaseCode"]}</Text>
          </View>
          <View style={card_styles}>
            <TouchableOpacity style={submit_button} onPress={handleSubmit}>
              <Text style={{ color: app_colors.white }}>
                {getLabelApp(preferences.language, "app_submit_continue")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && (
        <View style={container_animation}>
          <Text>
            {getLabelApp(
              preferences.language,
              "app_activation_code_initialize"
            )}
          </Text>
          <LottieView
            source={require("../../../assets/initialize.json")}
            style={{
              width: 200,
              height: 200,
            }}
            autoPlay
            loop
          />
        </View>
      )}
    </ScrollView>
  );
};
