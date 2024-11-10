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
  logVisitaIngressEgress,
  updateVisita,
} from "@gcVigilantes/store/Visita/api";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";
import { setLoading } from "@gcVigilantes/store/UI";
import { ENDPOINTS, getLabelApp, ROUTES } from "@gcVigilantes/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearVisita } from "@gcVigilantes/store/Visita";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { AddVehicle } from "@gcVigilantes/Components/AddVehicle/AddVehicle";

export const VisitaInfo = ({ navigation, route }: any) => {
  const { uniqueID, uri, tabAction } = route?.params;
  const preferences = useSelector((state: RootState) => state.preferences);
  const { instalaciones } = useSelector((state: RootState) => state.vigilancia);
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
    visitaId: 169,
    idTipoVisita: "1",
    idTipoIngreso: "1",
    idUsuario: 2,
    fechaIngreso: new Date().toISOString(),
    fechaSalida: new Date().toISOString(),
    multiple: 1,
    notificaciones: 1,
    appGenerado: 1,
    vigenciaQR: 1,
    uniqueId: "",
    autor: "",
    emailAutor: "",
    residencialSeccion: "",
    residencialNumInterior: 0,
    residencialNumExterior: 0,
    residencialCalle: "",
    residencialColonia: "",
    residencialCiudad: null,
    residencialEstado: "",
    residencialCP: 0,
    residencialNombre: "",
    nombre: "",
    vehicles: [],
    peatones: [],
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
    if (uniqueID) {
      AsyncStorage.getItem("id_caseta")
        .then((data) => {
          logVisitaIngressEgress(
            uniqueID,
            Number.parseInt(data || "0", 10),
            [0].includes(tabAction) ? "entry" : "exit"
          )
            .then((res) => res.json())
            .then((data) => {
              if (["400", 400].includes(data.estatus)) {
                throw new Error(data.message);
              }
              if ([0].includes(tabAction)) {
                dispatch(
                  getVisitaByUniqueID(uniqueID, `${data}`, navigation) as any
                );
              } else {
                dispatch(
                  setShowAlert({
                    showAlert: true,
                    title: "Éxito!",
                    type: ALERT_TYPES.SUCCESS,
                    message: data.message,
                  })
                );
                navigation.navigate(ROUTES.QR);
              }
            })
            .catch((error) => {
              console.error("Error al registrar el ingreso", error);
              dispatch(
                setShowAlert({
                  showAlert: true,
                  title: "Error",
                  type: ALERT_TYPES.ERROR,
                  message: `Error: ${
                    error
                      ? error
                      : getLabelApp(
                          preferences.language,
                          "app_screen_visit_info_error_ingress"
                        )
                  }`,
                })
              );
              navigation.navigate(ROUTES.QR);
            });
        })
        .catch((error) =>
          console.error("Error al obtener información de la caseta", error)
        );

      dispatch(getVehicles(uniqueID) as any);
    }

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
        status_registro: visitaRedux?.estatus_registro,
        vehicles: visitaRedux?.vehicles,
      }));
      dispatch(setLoading(false));
    }
  }, [visitaRedux]);

  return (
    <SafeAreaView>
      {(visitaRedux?.visita_id !== "" || [""].includes(uniqueID)) && (
        <KeyboardAwareScrollView>
          <VisitaDetails
            uri={!uri.includes("preview") ? uri : `${ENDPOINTS.QR}${uniqueID}`}
            autor={formValues?.nameAutor || ""}
            emailAutor={formValues?.emailAutor || ""}
            direccion={`${formValues?.residencial}, ${formValues?.calle}, ${formValues?.num_ext}`}
            estatus={Number.parseInt(formValues?.status_registro) || 0}
            notificaciones={formValues?.notificaciones === SWITCHER_VALUES.TRUE}
            handleNotificaciones={(value) => {
              setFormValues((prev) => ({ ...prev, notificaciones: value }));
            }}
            handleChangeTab={(tab) => setTab(tab)}
            num_int={formValues?.num_int || ""}
            seccion={formValues?.seccion || ""}
            newVisita={[""].includes(uniqueID)}
            selectedTab={tab}
          />
          {/** Main tab: Nombre visita, tipo visita, tipo Ingreso  */}
          {tab === TABS.MAIN && (
            <MainInfo
              catalogVisitas={catalogVisitas}
              catalogIngreso={catalogIngreso}
              tipoVisita={formValues?.idTipoVisita || ""}
              tipoIngreso={formValues?.idTipoIngreso || ""}
              nombreVisita={formValues?.nombre || ""}
              visitVehicles={formValues?.vehicles || []}
              newVisita={[""].includes(uniqueID)}
              estatus={Number.parseInt(formValues?.status_registro) || 1}
              handleOnChange={handleOnChange}
            />
          )}
          {tab === TABS.VEHICLES && (
            <AddVehicle
              visitVehicles={formValues.vehicles}
              register={[""].includes(uniqueID)}
              handleOnChange={(key: string, value: any) => {
                setFormValues((prev) => {
                  const tmp = { ...prev };
                  tmp[key] = value;
                  return tmp;
                });
              }}
            />
          )}
          {tab === TABS.DATE && (
            <DateInfo
              fromDate={formValues?.fechaIngreso}
              toDate={formValues?.fechaSalida}
              fromHour={formValues?.fromHour}
              toHour={formValues?.toHour}
              estatus={Number.parseInt(formValues?.status_registro) || 0}
              handleOnChange={handleOnChange}
            />
          )}
          {tab === TABS.GUEST && (
            <GuestInfo
              estatus={Number.parseInt(formValues?.status_registro) || 0}
            />
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
              multiple_entrada={formValues?.multiple === SWITCHER_VALUES.TRUE}
              handleOnchange={handleOnChange}
            />
          )}
          {["1"].includes(formValues?.status_registro) && (
            <FormSaveButtons
              onCancel={() => {}}
              onSave={() => {
                const payload = {
                  idVisita: formValues?.idVisita,
                  tipoVisita: formValues?.idTipoVisita,
                  tipoIngreso: formValues?.idTipoIngreso,
                  fechaIngreso: `${formValues?.fechaIngreso}:00:00`,
                  fechaSalida: `${formValues?.fechaSalida}:00:00`,
                  multiEntrada: formValues?.multiple,
                  notificaciones: formValues?.notificaciones,
                  nombreVisita: formValues?.nombre,
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
                console.log("payload ======>", payload);
                //  dispatch(updateVisita(payload) as any);
              }}
            />
          )}
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};
