import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { Text, View } from "react-native";
import { card_styles } from "./constants";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { GuestPicker } from "@gcVigilantes/Components/GuestPicker/GuestPicker";
import { GuestInfoProps } from "./constants";
import { getLabelApp } from "@gcVigilantes/utils";
import { addVehicleNotificationsStyles } from "@gcVigilantes/Components/AddVehicle/constants";
import { launchImageLibrary } from "react-native-image-picker";
import { AttachmentType } from "@gcVigilantes/store/Visita/types";
import { setInnerSpinner } from "@gcVigilantes/store/UI";

export const GuestInfo = ({
  estatus,
  peatones,
  errorValidator,
  handleViewAttachment,
  handleOnChange,
}: GuestInfoProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch();

  const handleOpenLibrary = (pedestrianId: string) => {
    launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
    })
      .then((response) => {
        const resources = response?.assets || [];
        if (response?.assets) {
          const tmpAttachments: AttachmentType[] = [];
          response?.assets.forEach((asset: any) => {
            const attachment: AttachmentType = {
              id: Math.random().toString(36).substr(2, 9),
              archivo: asset.uri || "",
              tipoEvidencia: "peaton",
              idVehiculo: "",
              idPeaton: pedestrianId,
              fechaRegistro: new Date().toISOString(),
              fechaActualizacion: new Date().toISOString(),
              estatusRegistro: "1",
            };
            tmpAttachments.push(attachment);
          });
          const pedestrian = peatones.find((p) => p.id === pedestrianId);

          if (pedestrian) {
            const updatedPedestrian = {
              ...pedestrian,
              attachedFiles: pedestrian.attachedFiles
                ? [...pedestrian.attachedFiles, ...tmpAttachments]
                : [...tmpAttachments],
            };
            const updatedPedestrians = peatones.map((p) =>
              p.id === pedestrianId ? updatedPedestrian : p,
            );
            handleOnChange("peatones", updatedPedestrians as any);
          }
        }
        const formData = new FormData();
        resources.forEach((asset: any, index: number) => {
          formData.append(`uploadedFile_${index}`, {
            uri: asset.uri,
            type: "image/png",
            name: asset.fileName,
          });
        });
        formData.append("id", pedestrianId);
        dispatch(setInnerSpinner(true));
        fetch("https://apimovilgc.dasgalu.net/visita/attachments/index.php", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            dispatch(setInnerSpinner(false));
          })
          .catch((error) => {
            console.error(error);
            dispatch(setInnerSpinner(false));
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {Object.hasOwn(errorValidator, "peatones") &&
        errorValidator.peatones.required && (
          <View style={[addVehicleNotificationsStyles.container]}>
            <Text style={[addVehicleNotificationsStyles.text]}>
              {getLabelApp(preferences.language, "app_empty_pedestrians")}
            </Text>
          </View>
        )}
      <View style={card_styles}>
        <CardTitle
          title={getLabelApp(
            preferences.language,
            "app_screen_visit_info_pedestrians_title",
          )}
          uppercase
        />
        <GuestPicker
          estatus={estatus}
          peatones={peatones}
          onViewAttachments={handleViewAttachment}
          onOpenLibrary={handleOpenLibrary}
          handleOnChange={handleOnChange}
        />
      </View>
    </>
  );
};
