import { ENDPOINTS } from "@gcVigilantes/utils";
import { setVisita, setVehicles } from "@gcVigilantes/store/Visita";
import { IVisita, VehiclesResType } from "../types";
import data_mock from "./data.json";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { setLoading } from "@gcVigilantes/store/UI";

export const getVisitaByUniqueID = (uniqueID: string) => (dispatch: any) => {
  const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.BY_UNIQUEID.replace(
    "{qr}",
    uniqueID,
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("visita uniqueID data ----->", data);
      dispatch(setVisita(data as IVisita));
    })

    .catch((error) => {
      console.error("Error:", error);
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
              }),
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
          }),
        );
      });
  };
