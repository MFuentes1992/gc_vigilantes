import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { VisitaDetails } from "@gcVigilantes/Components/VisitaDetails/VisitaDetails";
import { SWITCHER_VALUES, TABS } from "./constants";
import { MainInfo } from "./MainInfo";
import { FormSaveButtons } from "@gcVigilantes/Components/FormSaveButtons/FormSaveButtons";
import { DateInfo } from "./DateInfo";
import { GuestInfo } from "./GuestInfo";
import { SettingsInfo } from "./SettingsInfo";
import {
  getVehicles,
  getVisitaByUniqueID,
  updateVisita,
} from "@gcVigilantes/store/Visita/api";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";
import { setLoading } from "@gcVigilantes/store/UI";
import { ENDPOINTS } from "@gcVigilantes/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearVisita } from "@gcVigilantes/store/Visita";

export const VisitaInfo = ({ navigation, route }: any) => {
  const { uniqueID, uri } = route.params;
  const [tab, setTab] = useState<string>(TABS.MAIN);
  const [formValues, setFormValues] = useState<{
    [key: string]:
      | string
      | boolean
      | any
      | VehiclesResType[]
      | string[]
      | number;
  }>({
    visita_id: "",
    nombre_visita: "",
    fromDate: new Date().toISOString(),
    toDate: new Date().toISOString(),
    dateType: "",
    fromHour: "",
    toHour: "",
    hourType: "",
    tipo_ingreso: "",
    tipo_visita: "",
    vehicle_model: "",
    vehicle_color: "",
    vehicle_plate: "",
    multiple_entrada: false,
    notificaciones: false,
    vehicles: [],
  });

  const dispatch = useDispatch();
  const { catalogVisitas } = useSelector(
    (state: RootState) => state.tipoVisitas
  );
  const { catalogIngreso } = useSelector(
    (state: RootState) => state.tipoIngreso
  );
  const visitaRedux = useSelector((state: RootState) => state.visita);
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getCatalogTipoVisitas() as any);
    dispatch(getCatalogTipoIngreso() as any);
    AsyncStorage.getItem("id_caseta")
      .then((data) =>
        dispatch(getVisitaByUniqueID(uniqueID, `${data}`, navigation) as any)
      )
      .catch((error) =>
        console.error("Error al obtener información de la caseta", error)
      );

    dispatch(getVehicles(uniqueID) as any);
    return () => {
      dispatch(clearVisita());
    };
  }, []);

  const handleOnChange = (key: string, value: string) => {
    setFormValues((prev) => {
      const tmp = { ...prev };
      tmp[key] = value;
      return tmp;
    });
  };

  useEffect(() => {
    if (visitaRedux) {
      setFormValues(() => ({
        idVisita: visitaRedux?.visita_id,
        nameAutor: visitaRedux?.nameAutor,
        emailAutor: visitaRedux?.emailAutor,
        residencial: visitaRedux?.residencial,
        calle: visitaRedux?.calle,
        num_ext: visitaRedux?.num_ext,
        nombre_visita: visitaRedux?.nombre,
        estado: visitaRedux?.estado,
        num_int: visitaRedux?.num_int,
        seccion: visitaRedux?.seccion,
        fromDate: visitaRedux?.desde?.split("T")[0],
        toDate: visitaRedux?.hasta?.split("T")[0],
        // dateType: visitaRedux.tipo_fecha,
        fromHour: visitaRedux?.desde?.split("T")[1]?.split(":")[0],
        toHour: visitaRedux?.hasta?.split("T")[1]?.split(":")[0],
        // hourType: visitaRedux.tipo_hora,
        tipo_ingreso: visitaRedux?.tipo_ingreso,
        tipo_visita: visitaRedux?.tipo_visita,
        multiple_entrada: visitaRedux?.multiple_entrada,
        notificaciones: visitaRedux?.notificaciones,
        status_registro: visitaRedux?.status_registro,
        vehicles: visitaRedux?.vehicles,
      }));
      dispatch(setLoading(false));
    }
  }, [visitaRedux]);
  return (
    <SafeAreaView>
      {visitaRedux?.visita_id !== "" && (
        <KeyboardAwareScrollView>
          <VisitaDetails
            uri={!uri.includes("preview") ? uri : `${ENDPOINTS.QR}${uniqueID}`}
            autor={formValues?.nameAutor || ""}
            emailAutor={formValues?.emailAutor || ""}
            direccion={`${formValues?.residencial}, ${formValues?.calle}, ${formValues?.num_ext}`}
            estatus={Number.parseInt(formValues?.estado) || 0}
            notificaciones={formValues?.notificaciones === SWITCHER_VALUES.TRUE}
            handleNotificaciones={(value) => {
              setFormValues((prev) => ({ ...prev, notificaciones: value }));
            }}
            handleChangeTab={(tab) => setTab(tab)}
            num_int={formValues?.num_int || ""}
            seccion={formValues?.seccion || ""}
            selectedTab={tab}
          />
          {/** Main tab: Nombre visita, tipo visita, tipo Ingreso  */}
          {tab === TABS.MAIN && (
            <MainInfo
              catalogVisitas={catalogVisitas}
              catalogIngreso={catalogIngreso}
              tipoVisita={formValues?.tipo_visita || ""}
              tipoIngreso={formValues?.tipo_ingreso || ""}
              nombreVisita={formValues?.nombre_visita || ""}
              visitVehicles={formValues?.vehicles || []}
              estatus={Number.parseInt(formValues?.estado) || 0}
              handleOnChange={handleOnChange}
            />
          )}
          {tab === TABS.DATE && (
            <DateInfo
              fromDate={formValues?.fromDate}
              toDate={formValues?.toDate}
              fromHour={formValues?.fromHour}
              toHour={formValues?.toHour}
              estatus={Number.parseInt(formValues?.estado) || 0}
              handleOnChange={handleOnChange}
            />
          )}
          {tab === TABS.GUEST && (
            <GuestInfo estatus={Number.parseInt(formValues?.estado) || 0} />
          )}
          {tab === TABS.SETTINGS && (
            <SettingsInfo
              autor={formValues?.emailAutor || ""}
              uniqueID={uniqueID}
              seccion={formValues?.seccion || ""}
              num_int={formValues?.num_int || ""}
              residencial={formValues?.residencial || ""}
              calle={formValues?.calle || ""}
              num_ext={formValues?.num_ext || ""}
              colonia={formValues?.colonia || ""}
              ciudad={formValues?.ciudad || ""}
              estado={formValues?.estado || ""}
              cp={formValues?.cp || ""}
              notificaciones={
                formValues?.notificaciones === SWITCHER_VALUES.TRUE
              }
              multiple_entrada={
                formValues?.multiple_entrada === SWITCHER_VALUES.TRUE
              }
              handleOnchange={handleOnChange}
            />
          )}
          {["1"].includes(formValues?.estatus_registro) && (
            <FormSaveButtons
              onCancel={() => {}}
              onSave={() => {
                const payload = {
                  idVisita: formValues?.idVisita,
                  tipoVisita: formValues?.tipo_visita,
                  tipoIngreso: formValues?.tipo_ingreso,
                  fechaIngreso: `${formValues?.fromDate}T${formValues?.fromHour}:00:00`,
                  fechaSalida: `${formValues?.toDate}T${formValues?.toHour}:00:00`,
                  multiEntrada: formValues?.multiple_entrada,
                  notificaciones: formValues?.notificaciones,
                  nombreVisita: formValues?.nombre_visita,
                  vehicles: JSON.stringify(
                    [...formValues?.vehicles].map((vehicle) => ({
                      vehicle_id: vehicle.vehicle_id,
                      brand: vehicle.marca,
                      model: vehicle.modelo,
                      plates: vehicle.placas,
                      year: vehicle.anio,
                      color: vehicle.color,
                    }))
                  ),
                };
                dispatch(updateVisita(payload) as any);
              }}
            />
          )}
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};
