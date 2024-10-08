import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import RNQRGenerator from "rn-qr-generator";
import { useDispatch } from "react-redux";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { useCameraPermission } from "react-native-vision-camera";
import { ROUTES } from "@gcVigilantes/utils";
import { setScreen } from "@gcVigilantes/store/Pagination";
import { qrStyles } from "./constants";
import {
  app_text_menu,
  app_text_subtitle,
} from "@gcVigilantes/utils/default.styles";

export const ReadQR = ({ route, navigation }: any) => {
  const { error } = route?.params || {};
  const dispatch = useDispatch();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(setScreen(ROUTES.QR));
    });
  }, []);

  useEffect(() => {
    if (selectedImage !== "") {
      RNQRGenerator.detect({
        uri: selectedImage,
      })
        .then((response) => {
          const { values } = response;
          const tmpArray = values.toString().split("/");
          if (values.toString().includes("http")) {
            navigation.navigate(ROUTES.VISIT_INFO, {
              uniqueID: tmpArray[tmpArray.length - 1],
              uri: selectedImage,
              tabAction: selectedTab,
            });
          } else {
            setSelectedImage("");
            Alert.alert("Error", "QR code not valid");
          }
        })
        .catch((error) => console.log("Cannot detect QR code in image", error));
    }
  }, [selectedImage]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
    }
  }, [error]);

  const handleOpenLibrary = () => {
    launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    })
      .then((response) => {
        if (response?.assets) setSelectedImage(response?.assets[0].uri || "");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenCamera = () => {
    if (!hasPermission) {
      requestPermission();
    } else {
      navigation.navigate(ROUTES.CAMERA, {
        tabAction: selectedTab,
      });
    }
  };

  const handleSelectTab = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <View style={[qrStyles.container]}>
      <View style={[qrStyles.tab_container]}>
        <TouchableOpacity
          style={[
            qrStyles.button_tab,
            {
              backgroundColor: [0].includes(selectedTab)
                ? app_colors.active_blue
                : app_colors.light_blue_pale,
            },
          ]}
          onPress={() => handleSelectTab(0)}
        >
          <Text style={[app_text_subtitle]}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            qrStyles.button_tab,
            {
              backgroundColor: [1].includes(selectedTab)
                ? app_colors.active_blue
                : app_colors.light_blue_pale,
            },
          ]}
          onPress={() => handleSelectTab(1)}
        >
          <Text style={[app_text_subtitle]}>Salida</Text>
        </TouchableOpacity>
      </View>
      <View style={[qrStyles.qr_container]}>
        <View style={[qrStyles.qr_body]}>
          <View style={[qrStyles.image_container]}>
            <Image
              width={200}
              height={200}
              source={{
                uri:
                  selectedImage ||
                  "https://apimovilgc.dasgalu.net/assets/preview.jpeg",
              }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={[
              qrStyles.button_badge,
              {
                backgroundColor: "#5DADE2",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}
            onPress={handleOpenLibrary}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              Abrir desde galeria
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              qrStyles.button_badge,
              {
                backgroundColor: "#FFF",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              },
            ]}
            onPress={handleOpenCamera}
          >
            <Text
              style={{
                color: "#3498DB",
              }}
            >
              Escanear QR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
