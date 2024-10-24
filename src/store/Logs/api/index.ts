import { TFilter } from "@gcVigilantes/Components/Filters/Drawer/Drawer";
import { ENDPOINTS, stringTemplateAddQuery } from "@gcVigilantes/utils";
import { setLogs } from "..";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";

type LogsPayload = {
  id_caseta: number;
  filtros: TFilter;
};

export const getLogs = (payload: LogsPayload) => async (dispatch: any) => {
  const tmp = {
    casetaId: payload.id_caseta,
    fechaInicio: payload.filtros.fechaInicio,
    fechaFin: payload.filtros.fechaFin,
    tipoVisita: payload.filtros.tipo_visita,
    tipoIngreso: payload.filtros.tipo_ingreso,
  };
  const rawUrl = `${ENDPOINTS.BASE_URL}/${ENDPOINTS.VIGILANTE.LOGS}`;
  const url = stringTemplateAddQuery(rawUrl, tmp);
  console.info("Logs::API::getLogs::URL::", url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.info("Logs::API::getLogs::DATA::", data);
    dispatch(setLogs(data));
  } catch (error) {
    console.error("Logs::API::getLogs::ERROR::", error);
    setShowAlert({
      showAlert: false,
      title: "Error",
      message: "Algo salió mal, intente de nuevo",
      type: ALERT_TYPES.ERROR,
    });
  }
};
