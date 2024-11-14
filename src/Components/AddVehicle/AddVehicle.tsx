import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { HeaderActionButton } from "../HeaderActionButton/HeaderActionButton";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { vehicleCardStyles } from "./constants";
import {
  card_styles,
  getVehicleInfoStyles,
  mainInfoVehicleScrollStyles,
  NEW_VEHICLE,
} from "@gcVigilantes/pages/VisitaInfo/constants";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";
import { VehicleCard } from "../VehicleCard/VehicleCard";
import { CardTitle } from "../CardTitle/CardTitle";
import { getLabelApp } from "@gcVigilantes/utils";
import { RootState } from "@gcVigilantes/store";
import { useSelector } from "react-redux";
import { EditVehicles } from "../EditVehicles/EditVehicles";

type AddVehicleProps = {
  visitVehicles: VehiclesResType[];
  register: boolean;
  handleOnChange: (key: string, value: any) => void;
};

export const AddVehicle = (props: AddVehicleProps) => {
  const preferences = useSelector((state: RootState) => state.preferences);
  // -- Vehicle info
  const [vehicles, setVehicles] = useState<VehiclesResType[]>([]);
  const [editVehicle, setEditVehicle] = useState<VehiclesResType>(NEW_VEHICLE);

  useEffect(() => {
    setVehicles(props.visitVehicles);
  }, [props.visitVehicles]);

  const handleAddVehicle = () => {
    const tmpVehicle: VehiclesResType = {
      ...NEW_VEHICLE,
      id: Math.random().toString(36).substr(2, 9),
    };
    setVehicles([...vehicles, tmpVehicle]);
  };

  return (
    <>
      <View style={card_styles}>
        <View
          style={{
            position: "relative",
            width: "100%",
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              position: "relative",
              width: "50%",
              flexDirection: "row",
            }}
          >
            <CardTitle
              title={
                props.register
                  ? getLabelApp(
                      preferences.language,
                      "app_screen_visit_info_register_vehicle"
                    )
                  : getLabelApp(
                      preferences.language,
                      "app_screen_visit_info_edit_vehicle"
                    )
              }
              uppercase
              editIcon={false}
            />
          </View>
          <View
            style={{
              position: "relative",
              width: "50%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <HeaderActionButton
              icon="plus"
              color={app_colors.secondary_badge_vivid}
              onPress={handleAddVehicle}
            />
          </View>
        </View>

        <View style={{ position: "relative", width: "100%" }}>
          {vehicles.map((vehicle) => (
            <EditVehicles
              id={vehicle.id || ""}
              driver={vehicle.conductor}
              brand={vehicle.marca}
              model={vehicle.modelo}
              year={vehicle.anio}
              color={vehicle.color}
              plate={vehicle.placas}
              handleOnChange={(id: string, key: string, value: string) => {
                const currVehicle = vehicles.find(
                  (vehicle) => vehicle.id === id
                );
                if (currVehicle) {
                  const tmp = { ...currVehicle, [key]: value };
                  const updatedVehicles = vehicles.map((vehicle) =>
                    vehicle.id === id ? tmp : vehicle
                  );
                  setVehicles(updatedVehicles);
                  props.handleOnChange("vehicles", updatedVehicles as any);
                }
              }}
              handleClose={() => {
                const fltrVehicles = vehicles.filter(
                  (v) => v.id !== vehicle.id
                );
                setVehicles(fltrVehicles);
                props.handleOnChange("vehicles", fltrVehicles as any);
              }}
            />
          ))}
        </View>
      </View>
      <>
        <ScrollView
          style={[
            mainInfoVehicleScrollStyles,
            { height: vehicles.length === 0 || props.register ? 0 : 200 },
          ]}
          contentContainerStyle={getVehicleInfoStyles(vehicles)}
          horizontal
        >
          {!props.register &&
            vehicles?.map((vehicle: VehiclesResType, index: number) => (
              <VehicleCard
                key={vehicle.placas}
                id={index}
                vehicle={{ ...vehicle, id: vehicle.id || "" }}
                openModal={() => setEditVehicle({ ...vehicle })}
              />
            ))}
        </ScrollView>
      </>
      {editVehicle?.id && (
        <EditVehicles
          id={editVehicle.id || ""}
          driver={editVehicle.conductor}
          brand={editVehicle.marca}
          model={editVehicle.modelo}
          year={editVehicle.anio}
          color={editVehicle.color}
          plate={editVehicle.placas}
          handleOnChange={(id: string, key: string, value: string) => {
            const currVehicle = vehicles.find((vehicle) => vehicle.id === id);
            if (currVehicle) {
              const tmp = { ...currVehicle, [key]: value };
              const updatedVehicles = vehicles.map((vehicle) =>
                vehicle.id === id ? tmp : vehicle
              );
              setVehicles(updatedVehicles);
              props.handleOnChange("vehicles", updatedVehicles as any);
            }
          }}
          handleClose={() => {
            const fltrVehicles = vehicles.filter(
              (v) => v.id !== editVehicle.id
            );
            setVehicles(fltrVehicles);
            props.handleOnChange("vehicles", fltrVehicles as any);
          }}
        />
      )}
    </>
  );
};
