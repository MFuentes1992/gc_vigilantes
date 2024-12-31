import React, { useEffect } from "react";
import { TextInput, View, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { inputStyles } from "./constants";
import { CardTitle } from "../CardTitle/CardTitle";
import { card_styles_extended } from "@gcVigilantes/pages/VisitaInfo/constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { HeaderActionButton } from "../HeaderActionButton/HeaderActionButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { app_text_title_normal } from "@gcVigilantes/utils/default.styles";
import { launchImageLibrary } from "react-native-image-picker";

type EditVehiclesProps = {
  id: string;
  driver: string;
  brand: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  handleOnChange: (id: string, key: string, value: string) => void;
  onAttachCallback: (resources: any, id: string) => void;
  handleClose: () => void;
};

export const EditVehicles = ({
  id,
  brand,
  driver,
  model,
  year,
  color,
  plate,
  handleOnChange,
  onAttachCallback,
  handleClose,
}: EditVehiclesProps) => {
  // const [loadingImg, setLoadingImg] = React.useState<boolean>(false);
  const { innerSpinner } = useSelector((state: RootState) => state.ui);
  const handleOpenLibrary = () => {
    launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
    })
      .then((response) => {
        if (response?.assets) {
          /* console.log(response.assets);
          const formData = new FormData();
          response.assets.forEach((asset, index) => {
            formData.append(`uploadedFile_${index}`, {
              uri: asset.uri,
              type: "image/png",
              name: asset.fileName,
            });
          });
          setLoadingImg(true);
          fetch("https://apimovilgc.dasgalu.net/visita/attachments/index.php", {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res);
              setLoadingImg(false);
            })
            .catch((error) => {
              console.error(error);
              setLoadingImg(false);
            }); */
          onAttachCallback(response?.assets || [], id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View key="container-edit-vehicle" style={card_styles_extended}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "5%",
          marginBottom: "2%",
        }}
      >
        <HeaderActionButton
          icon="times-circle"
          color={app_colors.ligth_bg}
          onPress={handleClose}
        />
      </View>
      <TextInput
        style={inputStyles}
        onChangeText={(driver: string) =>
          handleOnChange(id, "conductor", driver)
        }
        value={driver}
        placeholder="Conductor"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(brand: string) => handleOnChange(id, "marca", brand)}
        value={brand}
        placeholder="Marca del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(model: string) => handleOnChange(id, "modelo", model)}
        value={model}
        placeholder="Modelo del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(year: string) => handleOnChange(id, "anio", year)}
        value={year}
        placeholder="Año del vehículo"
        keyboardType="numeric"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(color: string) => handleOnChange(id, "color", color)}
        value={color}
        placeholder="Color del vehículo"
      />
      <TextInput
        style={inputStyles}
        onChangeText={(plate: string) => handleOnChange(id, "placas", plate)}
        value={plate}
        placeholder="Matrícula del vehículo"
      />
      <TouchableOpacity onPress={handleOpenLibrary}>
        {!innerSpinner && (
          <Text style={[app_text_title_normal, { color: app_colors.black }]}>
            Attach image
          </Text>
        )}
        {innerSpinner && (
          <ActivityIndicator
            size="small"
            color={app_colors.black}
            // animating={loadingImg}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
