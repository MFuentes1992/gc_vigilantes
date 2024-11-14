import { ENDPOINTS, stringTemplateAddQuery } from "@gcVigilantes/utils";
import { setCasetaInfo, setInstalaciones } from "..";
import { setLoading } from "@gcVigilantes/store/UI";

export const getCasetaInfo =
  (activationCode: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const url = stringTemplateAddQuery(
        `${ENDPOINTS.BASE_URL}${ENDPOINTS.VIGILANTE.INFO}`,
        { activation_code: activationCode }
      );
      const response = await fetch(url);
      const data = await response.json();
      const [caseta] = data;
      console.log("CASETA INFO:::API", data);
      dispatch(setCasetaInfo(caseta as any));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
    }
  };

export const getInstalacionesByRecinto =
  (recintoId: string) => async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      const url = stringTemplateAddQuery(
        `${ENDPOINTS.BASE_URL}${ENDPOINTS.VIGILANTE.INSTALACIONES}`,
        { recintoId }
      );
      console.log("INSTALACIONES:::URL:::", url);
      const response = await fetch(url);
      const data = await response.json();
      console.log("INSTALACIONES:::", data);
      dispatch(setInstalaciones(data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.error(error);
    }
  };
