import {
  ENDPOINTS,
  getLabelApp,
  ROUTES,
  stringTemplateAddQuery,
} from "@gcVigilantes/utils";
import { setVisita, setVehicles } from "@gcVigilantes/store/Visita";
import { IVisita, VehiclesResType } from "../types";
import data_mock from "./data.json";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { setLoading } from "@gcVigilantes/store/UI";

export const getVisitaByUniqueID =
  (uniqueID: string, id_caseta: string, navigation: any) => (dispatch: any) => {
    const url = stringTemplateAddQuery(
      `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.BY_UNIQUEID}`,
      { qr: uniqueID, id_caseta }
    );
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("estatus") && data.estatus === "400") {
          navigation.navigate(ROUTES.HOME, {
            error: getLabelApp("es", "app_error_message"),
          });
          return;
        }
        const [visita] = data;
        dispatch(setVisita(visita as IVisita));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

export const getVehicles = (uniqueID: string) => (dispatch: any) => {
  const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.VEHICLES.replace(
    "{qr}",
    uniqueID
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
  (visita: { [key: string]: any }) => (dispatch: any) => {
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
        new Promise((resolve) => {
          dispatch(setLoading(false));
          resolve("success");
        }).then(() => {
          setTimeout(() => {
            dispatch(
              setShowAlert({
                showAlert: true,
                title: "Exito!",
                message: data.message,
                type: ALERT_TYPES.SUCCESS,
              })
            );
          }, 500);
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
          })
        );
      });
  };

export const logVisitaIngressEgress = async (
  qr: string,
  id_caseta: number,
  type: string
) => {
  const url = ENDPOINTS.VISITAS.LOG_INGRESS;
  const formData = new FormData();
  formData.append("qr", qr);
  formData.append("casetaId", id_caseta.toString());
  formData.append("type", type);
  return fetch(url, {
    method: "POST",
    body: formData,
  });
};
