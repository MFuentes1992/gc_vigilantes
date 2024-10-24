import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { logsStyles } from "./constants";
import { Filters } from "@gcVigilantes/Components/Filters/Filters";
import { TFilter } from "@gcVigilantes/Components/Filters/Drawer/Drawer";
import { LogCard } from "@gcVigilantes/pages/Logs/component/LogCard/LogCard";
import { getLogs } from "@gcVigilantes/store/Logs/api";
import { hourFormat, timeZone } from "@gcVigilantes/utils";
import { SafeAreaView } from "react-native-safe-area-context";

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
  }, []);

  const handleFilters = (values: TFilter) => {
    console.info("Logs::COMP::handleFilters::", values);
    dispatch(
      getLogs({
        id_caseta: userData.id_caseta,
        filtros: {
          ...values,
        },
      }) as any
    );
  };

  const handleClearFilters = () => {
    console.info("Logs::COMP::handleClearFilters");
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
  };

  return (
    <View style={logsStyles.constainer}>
      <Filters
        position="right"
        drawerCallback={handleFilters}
        drawerClearCallback={handleClearFilters}
      />
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            padding: 15,
          }}
        >
          {logs.map((log, index) => (
            <LogCard
              key={index}
              date={new Date(log.fecha_lectura.split(" ")[0]).toLocaleString(
                timeZone,
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour12: true,
                }
              )}
              time={hourFormat(new Date(log.fecha_lectura).getTime())}
              address={`${log.seccion} ${log.numero}`}
              name={log.nombre_visita}
              type={log.tipo_visita}
              ingress={log.tipo_ingreso}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
