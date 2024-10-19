import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";
import { card_styles } from "@gcVigilantes/pages/VisitaInfo/constants";
import { TipoVisitasIcon } from "@gcVigilantes/pages/VisitaInfo/MainInfo";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { setLoading } from "@gcVigilantes/store/UI";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

export const Drawer = () => {
  const dispatch = useDispatch();
  const { catalogVisitas } = useSelector(
    (state: RootState) => state.tipoVisitas
  );
  const { catalogIngreso } = useSelector(
    (state: RootState) => state.tipoIngreso
  );

  useEffect(() => {
    dispatch(setLoading(true));
    if (catalogVisitas.length === 0) {
      console.info("Drawer::COMP::CatalogVisitas is empty");
      console.info("Drawer::COMP::Fetching CatalogVisitas");
      dispatch(getCatalogTipoVisitas() as any);
    }
    if (catalogIngreso.length === 0) {
      console.info("Drawer::COMP::CatalogIngreso is empty");
      console.info("Drawer::COMP::Fetching CatalogIngreso");
      dispatch(getCatalogTipoIngreso() as any);
    }
  }, []);

  const handleOnChange = (field: string, value: string) => {
    console.info(`Drawer::COMP::handleOnChange::${field}::${value}`);
  };

  useEffect(() => {
    if (catalogVisitas.length > 0 && catalogIngreso.length > 0) {
      dispatch(setLoading(false));
    }
  }, [catalogVisitas, catalogIngreso]);

  return (
    <ScrollView
      contentContainerStyle={{
        position: "relative",
        width: "100%",
      }}
    >
      <View style={card_styles}>
        <CardTitle title="tipo de visita" uppercase />
        <RadioGroup
          selectedValue={catalogVisitas[0].id}
          disabled={false}
          orientation="vertical"
          options={catalogVisitas.map((catalog) => ({
            id: catalog.id,
            label: catalog.tipo_visita,
            icon: TipoVisitasIcon[
              catalog.id.toString()
            ] as unknown as React.ReactNode,
          }))}
          handleChange={(value: string) => {
            handleOnChange("tipo_visita", value);
          }}
        />
      </View>
      <View style={card_styles}>
        <CardTitle title="Tipo ingreso" uppercase />
        <RadioGroup
          options={catalogIngreso.map((catalog) => ({
            id: catalog.id,
            label: catalog.tipo_ingreso,
            icon: TipoVisitasIcon[
              catalog.tipo_ingreso
            ] as unknown as React.ReactNode,
          }))}
          selectedValue={catalogIngreso[0].id}
          disabled={false}
          orientation="vertical"
          handleChange={(value: string) => {
            handleOnChange("tipo_ingreso", value);
          }}
        />
      </View>
    </ScrollView>
  );
};
