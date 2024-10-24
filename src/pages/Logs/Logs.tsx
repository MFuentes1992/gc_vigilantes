import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";

import { View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native-gesture-handler";
import { logsStyles } from "./constants";
import { Filters } from "@gcVigilantes/Components/Filters/Filters";
import {
  Drawer,
  TFilter,
} from "@gcVigilantes/Components/Filters/Drawer/Drawer";
import { LogCard } from "@gcVigilantes/pages/Logs/component/LogCard/LogCard";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { getLogs } from "@gcVigilantes/store/Logs/api";

export const Logs = () => {
  const dispatch = useDispatch();
  const { logs } = useSelector((state: RootState) => state.logs);
  const userData = useSelector((state: RootState) => state.userData);

  useEffect(() => {
    dispatch(
      getLogs({
        id_caseta: userData.id_caseta,
        filtros: {
          tipo_visita: "",
          tipo_ingreso: "",
          fechaInicio: "",
          fechaFin: "",
        },
      }) as any
    );
  }, [logs]);

  const handleFilters = (values: TFilter) => {
    console.info("Logs::COMP::handleFilters::", values);
  };

  return (
    <View style={logsStyles.constainer}>
      <Filters
        position="right"
        drawerComponent={() => <Drawer onApply={handleFilters} />}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          height: "100%",
        }}
      >
        <LogCard
          date="01 de Enero de 2021"
          time="10:00"
          address="Calle 123"
          name="Juan Pérez"
          type="Visita"
          ingress="Vehículo"
        />
        <LogCard
          date="01 de Enero de 2021"
          time="10:00"
          address="Calle 123"
          name="Juan Pérez"
          type="Visita"
          ingress="Peatonal"
        />
      </ScrollView>
    </View>
  );
};
