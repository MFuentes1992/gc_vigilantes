import {
  ENDPOINTS,
  getLabelApp,
  ROUTES,
  stringTemplateAddQuery,
} from "@gcVigilantes/utils";
import { setVisita, setVehicles } from "@gcVigilantes/store/Visita";
import { IVisita, VehiclesResType } from "../types";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { setLoading } from "@gcVigilantes/store/UI";

export const getVisitaByUniqueID =
  (uniqueID: string, navigation: any) => (dispatch: any) => {
    const url = stringTemplateAddQuery(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.BY_UNIQUEID}`,
      { uniqueId: uniqueID },
    );
    console.log("VISITA::URL::UNIQUE", url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("estatus") && data.estatus === "400") {
          navigation.navigate(ROUTES.HOME, {
            error: getLabelApp("es", "app_error_message"),
          });
          return;
        }
        // const [visita] = data;
        dispatch(setVisita(data as IVisita));
      })
      .catch((error) => {
        console.error("Error:", error);
        navigation.navigate(ROUTES.HOME, {
          error: getLabelApp("es", "app_error_message"),
        });
      });
  };

export const getVehicles = (uniqueID: string) => (dispatch: any) => {
  const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.VEHICLES.replace(
    "{qr}",
    uniqueID,
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dispatch(setVehicles([...data] as VehiclesResType[]));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const updateVisita =
  (visita: { [key: string]: any }, callback: () => void) => (dispatch: any) => {
    dispatch(setLoading(true));
    const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.UPDATE}`;
    const formData = new FormData();
    Object.keys(visita).forEach((key) => {
      formData.append(key, visita[key]);
    });
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        logVisitaIngressEgress(visita.uniqueID, visita.id_caseta, "entry")
          .then(() => {
            dispatch(setLoading(false));
            dispatch(
              setShowAlert({
                showAlert: true,
                title: "Exito!",
                message: data?.message,
                type: ALERT_TYPES.SUCCESS,
              }),
            );
            callback();
          })
          .catch(() => {
            dispatch(setLoading(false));
            dispatch(
              setShowAlert({
                showAlert: false,
                title: "Error",
                message: "Algo salió mal, intente de nuevo",
                type: ALERT_TYPES.ERROR,
              }),
            );
          });
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(
          setShowAlert({
            showAlert: false,
            title: "Error",
            message: "Algo salió mal, intente de nuevo",
            type: ALERT_TYPES.ERROR,
          }),
        );
      });
  };

export const logVisitaIngressEgress = async (
  qr: string,
  id_caseta: number,
  type: string,
) => {
  const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.LOG_INGRESS}`;
  const formData = new FormData();
  formData.append("qr", qr);
  formData.append("casetaId", id_caseta.toString());
  formData.append("type", type);
  return fetch(url, {
    method: "POST",
    body: formData,
  });
};

export const createVisita =
  (visita: { [key: string]: any }, callback: () => void) => (dispatch: any) => {
    const formValues = new FormData();
    Object.keys(visita).forEach((key) => {
      formValues.append(key, visita[key]);
    });
    dispatch(setLoading(true));
    const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.CREATE}`;
    fetch(url, {
      method: "POST",
      body: formValues,
    })
      .then((response) => response.json())
      .then((data) => {
        const { uniqueID } = data;
        logVisitaIngressEgress(uniqueID, visita.id_caseta, "entry").then(() => {
          dispatch(setLoading(false));
          dispatch(
            setShowAlert({
              showAlert: true,
              title: "Visita creada.",
              message: data.message,
              type: ALERT_TYPES.SUCCESS,
            }),
          );
          callback();
        });
      })
      .catch((error) => {
        dispatch(setLoading(false));
        dispatch(
          setShowAlert({
            showAlert: false,
            title: "Error",
            message: "Algo salió mal, intente de nuevo",
            type: ALERT_TYPES.ERROR,
          }),
        );
      });
  };
