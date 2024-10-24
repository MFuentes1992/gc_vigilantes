import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { useDispatch, useSelector } from "react-redux";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";
import { card_styles } from "@gcVigilantes/pages/VisitaInfo/constants";
import { TipoVisitasIcon } from "@gcVigilantes/pages/VisitaInfo/MainInfo";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { setLoading } from "@gcVigilantes/store/UI";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar } from "react-native-calendars";
import { drawer_card_styles } from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { getLabelApp } from "@gcVigilantes/utils";

export type TFilter = {
  tipo_visita: string;
  tipo_ingreso: string;
  fechaInicio: string;
  fechaFin: string;
};

type TDrawerProps = {
  onApply: (filterValues: TFilter) => void;
};

export const Drawer = ({ onApply }: TDrawerProps) => {
  const dispatch = useDispatch();
  const { catalogVisitas } = useSelector(
    (state: RootState) => state.tipoVisitas
  );
  const { catalogIngreso } = useSelector(
    (state: RootState) => state.tipoIngreso
  );

  const { language } = useSelector((state: RootState) => state.preferences);

  const [filterValues, setFilterValues] = React.useState<TFilter>(
    {} as TFilter
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
    setFilterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (catalogVisitas.length > 0 && catalogIngreso.length > 0) {
      dispatch(setLoading(false));
    }
  }, [catalogVisitas, catalogIngreso]);

  useEffect(() => {
    console.info("Drawer::COMP::filterValues::", filterValues);
  }, [filterValues]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          position: "relative",
          width: "100%",
        }}
      >
        <View style={drawer_card_styles.container}>
          <CardTitle title="tipo de visita" uppercase />
          <RadioGroup
            selectedValue={filterValues.tipo_visita}
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
        <View style={drawer_card_styles.container}>
          <CardTitle title="Tipo ingreso" uppercase />
          <RadioGroup
            options={catalogIngreso.map((catalog) => ({
              id: catalog.id,
              label: catalog.tipo_ingreso,
              icon: TipoVisitasIcon[
                catalog.tipo_ingreso
              ] as unknown as React.ReactNode,
            }))}
            selectedValue={filterValues.tipo_ingreso}
            disabled={false}
            orientation="vertical"
            handleChange={(value: string) => {
              handleOnChange("tipo_ingreso", value);
            }}
          />
        </View>
        <View style={drawer_card_styles.container}>
          <Calendar
            calendarWidth={300}
            calendarHeight={400}
            markingType="period"
            markedDates={{
              [filterValues.fechaInicio]: {
                selected: true,
                //startingDay: true,
                color: app_colors.text_dark,
                textColor: "white",
              },
              [filterValues.fechaFin]: {
                selected: true,
                // endingDay: true,
                color: app_colors.text_dark,
                textColor: "white",
              },
            }}
            onDayPress={(day: any) => {
              console.info("Drawer::COMP::onDayPress::", day);
              if (filterValues.fechaInicio && filterValues.fechaFin) {
                handleOnChange("fechaInicio", day.dateString);
                handleOnChange("fechaFin", "");
              } else if (filterValues.fechaInicio) {
                handleOnChange("fechaFin", day.dateString);
              } else {
                handleOnChange("fechaInicio", day.dateString);
              }
            }}
            enableSwipeMonths
            shouldRasterizeIOS
          />
        </View>
        <View style={[drawer_card_styles.container, { marginBottom: 10 }]}>
          <Button
            title={getLabelApp(language, "app_comp_filters_drawer_clear")}
            onPress={() => {
              console.info("Drawer::COMP::Clear button pressed");
              setFilterValues({} as TFilter);
            }}
          />
          <Button
            title={getLabelApp(language, "app_comp_filters_drawer_apply")}
            onPress={() => {
              console.info("Drawer::COMP::Apply button pressed");
              onApply(filterValues);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};
