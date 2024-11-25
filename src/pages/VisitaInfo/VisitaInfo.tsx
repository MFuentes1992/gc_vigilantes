import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { VisitaDetails } from "@gcVigilantes/Components/VisitaDetails/VisitaDetails";
import { DATE_TYPES, SWITCHER_VALUES, TABS, VisitaPeaton } from "./constants";
import { MainInfo } from "./MainInfo";
import { FormSaveButtons } from "@gcVigilantes/Components/FormSaveButtons/FormSaveButtons";
import { DateInfo } from "./DateInfo";
import { GuestInfo } from "./GuestInfo";
import { SettingsInfo } from "./SettingsInfo";
import {
  createVisita,
  getVehicles,
  getVisitaByUniqueID,
  logVisitaIngressEgress,
  updateVisita,
} from "@gcVigilantes/store/Visita/api";
import { VehiclesResType } from "@gcVigilantes/store/Visita/types";
import { setLoading } from "@gcVigilantes/store/UI";
import {
  ENDPOINTS,
  getLabelApp,
  militarToTwelveHours,
  ROUTES,
  toMilitarHours,
  visitaNavigatorBack,
  visitaNavigatorForward,
  validateForm,
} from "@gcVigilantes/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearVisita } from "@gcVigilantes/store/Visita";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { AddVehicle } from "@gcVigilantes/Components/AddVehicle/AddVehicle";

export const VisitaInfo = ({ navigation, route }: any) => {
  const { uniqueID, uri, tabAction } = route?.params;
  const preferences = useSelector((state: RootState) => state.preferences);
  const { instalaciones } = useSelector((state: RootState) => state.vigilancia);
  const { id_caseta } = useSelector((state: RootState) => state.userData);
  const [tab, setTab] = useState<string>(TABS.MAIN);
  const [errors, setErrors] = useState<{
    [key: string]: { required: boolean };
  }>({});
  const [formValues, setFormValues] = useState<{
    [key: string]:
      | string
      | boolean
      | any
      | VehiclesResType[]
      | VisitaPeaton[]
      | string[]
      | number;
  }>({
    idTipoVisita: "1",
    idTipoIngreso: "1",
    idInstalacion: "",
    idUsuario: "",
    fechaIngreso: new Date().toISOString(),
    fechaIngresoHora: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h12",
    }),
    fechaSalida: new Date().toISOString(),
    fechaSalidaHora: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h12",
    }),
    dateTypeInput: DATE_TYPES.END,
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
    estatusVisita: "Activa",
    vehicles: [],
    peatones: [],
    id_caseta,
  });

  const dispatch = useDispatch();
  const { catalogVisitas } = useSelector(
    (state: RootState) => state.tipoVisitas,
  );
  const { catalogIngreso } = useSelector(
    (state: RootState) => state.tipoIngreso,
  );
  const visitaRedux = useSelector((state: RootState) => state.visita);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getCatalogTipoVisitas() as any);
    dispatch(getCatalogTipoIngreso() as any);
    if (uniqueID) {
      dispatch(getVisitaByUniqueID(uniqueID, navigation) as any);
    }
    return () => {
      dispatch(clearVisita());
      setFormValues({});
    };
  }, []);

  const handleOnChange = (key: string, value: string | number) => {
    setFormValues((prev) => {
      const tmp = { ...prev };
      tmp[key] = value;
      return tmp;
    });
  };

  useEffect(() => {
    if (![""].includes(visitaRedux.visitaId)) {
      AsyncStorage.getItem("id_caseta")
        .then((data) => {
          setFormValues(() => ({
            ...visitaRedux,
            fechaIngreso: visitaRedux?.fechaIngreso?.split("T")[0],
            fechaIngresoHora: militarToTwelveHours(
              visitaRedux?.fechaIngreso?.split("T")[1] ||
                new Date().toLocaleTimeString(preferences.locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            ),
            fechaSalida: visitaRedux?.fechaSalida?.split("T")[0],
            fechaSalidaHora: militarToTwelveHours(
              visitaRedux?.fechaSalida?.split("T")[1] ||
                new Date().toLocaleTimeString(preferences.locale, {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
            ),
            dateTypeInput: DATE_TYPES.END,
            vehicles: visitaRedux.vehicles,
            peatones: visitaRedux.pedestrians,
            id_caseta: data,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
  }, [visitaRedux]);

  return (
    <SafeAreaView>
      {(visitaRedux?.visitaId !== "" || [""].includes(uniqueID)) && (
        <KeyboardAwareScrollView>
          <VisitaDetails
            uri={!uri.includes("preview") ? uri : `${ENDPOINTS.QR}${uniqueID}`}
            autor={formValues?.autor || ""}
            emailAutor={formValues?.emailAutor || ""}
            direccion={`${formValues?.residencialNombre}, ${formValues?.residencialCalle}, ${formValues?.residencialNumExterior}`}
            estatus={formValues?.estatusVisita}
            notificaciones={[...SWITCHER_VALUES.TRUE].includes(
              formValues?.notificaciones,
            )}
            handleNotificaciones={(value) => {
              setFormValues((prev) => ({ ...prev, notificaciones: value }));
            }}
            idTipoIngreso={formValues?.idTipoIngreso || 0}
            handleChangeTab={(tab) => setTab(tab)}
            num_int={formValues?.residencialNumInterior || ""}
            seccion={formValues?.residencialSeccion || ""}
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
              instalaciones={instalaciones}
              errorValidator={errors}
              selectedInstalacion={{
                idInstalacion: formValues?.idInstalacion || "",
                idUsuario: formValues?.idUsuario || "",
                seccion: formValues?.residencialSeccion || "",
                numInt: formValues?.residencialNumInterior || "",
                owner: formValues?.autor || "",
              }}
              handleOnChange={handleOnChange}
            />
          )}
          {tab === TABS.VEHICLES &&
            ["1"].includes(formValues?.idTipoIngreso) && (
              <AddVehicle
                visitVehicles={formValues.vehicles}
                errorValidator={errors}
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
              fechaIngreso={formValues?.fechaIngreso}
              fechaSalida={formValues?.fechaSalida}
              horaIngreso={formValues?.fechaIngresoHora}
              horaSalida={formValues?.fechaSalidaHora}
              dateTypeInput={formValues?.dateTypeInput}
              estatus={formValues?.estatusVisita}
              edit={[""].includes(uniqueID)}
              handleOnChange={handleOnChange}
            />
          )}
          {tab === TABS.GUEST && (
            <GuestInfo
              estatus={["Activa"].includes(formValues?.estatusVisita)}
              peatones={formValues?.peatones || []}
              errorValidator={errors}
              handleOnChange={(key: string, value: any) => {
                setFormValues((prev) => {
                  const tmp = { ...prev };
                  tmp[key] = value;
                  return tmp;
                });
              }}
            />
          )}
          {tab === TABS.SETTINGS && (
            <SettingsInfo
              autor={formValues?.autor || ""}
              uniqueID={uniqueID}
              seccion={formValues?.residencialSeccion || ""}
              num_int={formValues?.residencialNumInterior || ""}
              residencial={formValues?.residencial || ""}
              calle={formValues?.residencialCalle || ""}
              num_ext={formValues?.residencialNumExterior || ""}
              colonia={formValues?.residencialColonia || ""}
              ciudad={formValues?.residencialCiudad || ""}
              estado={formValues?.residencialEstado || ""}
              cp={formValues?.residencialCP || ""}
              notificaciones={[...SWITCHER_VALUES.TRUE].includes(
                formValues?.notificaciones,
              )}
              multiple_entrada={[...SWITCHER_VALUES.TRUE].includes(
                formValues?.multiple,
              )}
              handleOnchange={handleOnChange}
            />
          )}
          {["Activa"].includes(formValues?.estatusVisita) && (
            <FormSaveButtons
              onCancel={() => {
                if ([TABS.MAIN].includes(tab)) {
                  navigation.navigate(ROUTES.HOME);
                } else {
                  setTab((prev) =>
                    visitaNavigatorBack(prev, formValues?.idTipoIngreso),
                  );
                }
              }}
              onSave={() => {
                if ([TABS.SETTINGS].includes(tab)) {
                  // TODO: Update visita or create visita.
                  if ([""].includes(uniqueID)) {
                    console.log({
                      horaSalida: formValues?.fechaSalidaHora,
                      horaEntrada: formValues?.fechaIngresoHora,
                    });

                    const payload: {
                      [key: string]: string | number | Array<any>;
                    } = {
                      idUsuario: formValues?.idUsuario,
                      idTipoVisita: formValues?.idTipoVisita,
                      idTipoIngreso: formValues?.idTipoIngreso,
                      idInstalacion: formValues?.idInstalacion,
                      fechaIngreso: `${
                        formValues?.fechaIngreso.split("T")[0]
                      }T${toMilitarHours(formValues?.fechaIngresoHora)}`,
                      fechaSalida: `${
                        formValues?.fechaSalida.split("T")[0]
                      }T${toMilitarHours(formValues?.fechaSalidaHora)}`,
                      multiple: formValues?.multiple,
                      notificaciones: formValues?.notificaciones,
                      appGenerado: 0,
                      nombreVisita: formValues?.nombre,
                      id_caseta: formValues?.id_caseta,
                    };
                    if (["1"].includes(formValues?.idTipoIngreso))
                      payload.vehicles = formValues?.vehicles;
                    if (["2"].includes(formValues?.idTipoIngreso))
                      payload.peatones = formValues?.peatones;
                    const formValid = validateForm(payload);
                    console.log("formValid ====>", formValid);

                    if (formValid.isValid) {
                      payload.vehiculos = JSON.stringify(payload?.vehiculos);
                      payload.peatones = JSON.stringify(payload?.peatones);
                      dispatch(createVisita(payload) as any);
                    } else {
                      setErrors(formValid.errors);
                      dispatch(
                        setShowAlert({
                          showAlert: true,
                          title: "Error",
                          message: getLabelApp(
                            preferences.language,
                            "app_empty_field",
                          ),
                          type: ALERT_TYPES.ERROR,
                        }) as any,
                      );
                    }
                  } else {
                    const payload = {
                      idVisita: formValues?.visitaId,
                      idTipoVisita: formValues?.idTipoVisita,
                      idTipoIngreso: formValues?.idTipoIngreso,
                      uniqueID: formValues?.uniqueId,
                      fechaIngreso: `${
                        formValues?.fechaIngreso.split("T")[0]
                      }T${toMilitarHours(formValues?.fechaIngresoHora)}`,
                      fechaSalida: `${
                        formValues?.fechaSalida.split("T")[0]
                      }T${toMilitarHours(formValues?.fechaSalidaHora)}`,
                      multiple: formValues?.multiple,
                      notificaciones: formValues?.notificaciones,
                      nombreVisita: formValues?.nombre,
                      vehiculos: JSON.stringify(formValues?.vehicles),
                      peatones: JSON.stringify(formValues?.peatones),
                      id_caseta: formValues?.id_caseta,
                    };
                    const formValid = validateForm(payload);
                    if (formValid.isValid) {
                      dispatch(updateVisita(payload) as any);
                    } else {
                      setErrors(formValid.errors);
                      dispatch(
                        setShowAlert({
                          showAlert: true,
                          title: "Error",
                          message: getLabelApp(
                            preferences.language,
                            "app_empty_field",
                          ),
                          type: ALERT_TYPES.ERROR,
                        }) as any,
                      );
                    }
                  }
                } else {
                  setTab((prev) =>
                    visitaNavigatorForward(prev, formValues?.idTipoIngreso),
                  );
                }
              }}
              saveText={getLabelApp(
                preferences.language,
                [TABS.SETTINGS].includes(tab)
                  ? "app_screen_visit_info_save_button_complete"
                  : "app_screen_visit_info_save_button_next",
              )}
              cancelText={
                [TABS.MAIN].includes(tab)
                  ? getLabelApp(
                      preferences.language,
                      "app_screen_visit_info_cancel_button",
                    )
                  : getLabelApp(
                      preferences.language,
                      "app_screen_visit_info_cancel_button_back",
                    )
              }
            />
          )}
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};
