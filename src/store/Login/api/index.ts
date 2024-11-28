import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import {
  ENDPOINTS,
  getLabelApp,
  LOCAL_STORAGE_KEYS,
  ROUTES,
} from "@gcVigilantes/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// -- REMOVE DEFAULT PARAMS
export const InitializeConnection = (dbCode: string) => {
  const formdata = new FormData();
  formdata.append("prefix", "u579469339");
  formdata.append("code", dbCode);
  const requestOptions = {
    method: "POST",
    body: formdata,
  };
  return fetch(`${ENDPOINTS.BASE_URL}`, requestOptions);
};

export const login = async (accessCode: string) => {
  const formdata = new FormData();
  formdata.append("email", accessCode);
  formdata.append("password", accessCode);

  const requestOptions = {
    method: "POST",
    body: formdata,
    Headers: {
      "content-type": "multipart/form-data",
    },
  };

  const response = await fetch(`${ENDPOINTS.BASE_URL}/?login`, requestOptions);
  return response.json();
};

export const getActivationCode = async (accessCode: string) => {
  const formdata = new FormData();
  formdata.append("code", accessCode);
  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const res = await fetch(
    `${ENDPOINTS.BASE_URL}${ENDPOINTS.VIGILANTE.CODE}`,
    requestOptions,
  );
  return res.json();
};

export const endSession = async () => {
  await fetch(`${ENDPOINTS.BASE_URL}?logout`);
};

/**
 *
 * @param dbCode
 * @param accessCode
 * @returns 3-way authentication results, index 2 is instalation code.
 */
export const threeWayAuthentication =
  (
    dbCode: string,
    accessCode: string,
    navigation: any,
    errorFallback: () => void,
  ) =>
  async (dispatch: any) => {
    try {
      const authRes = await InitializeConnection(dbCode);
      if (authRes.status !== 200) {
        throw new Error("Código de base de datos erróneo o inactivo.");
      }
      //TODO: evaluate if necessary request, await login(accessCode);
      const activationRes = await getActivationCode(accessCode);

      if (["203", 203].includes(activationRes.code)) {
        throw new Error(getLabelApp("es", "app_activation_code_used"));
      }

      if (["400", 400].includes(activationRes.code)) {
        throw new Error(getLabelApp("es", "app_activation_code_invalid"));
      }

      if (activationRes) {
        AsyncStorage.setItem(
          LOCAL_STORAGE_KEYS.INSTALATION_TOKEN,
          activationRes.token_instalacion,
        );
        AsyncStorage.setItem(
          LOCAL_STORAGE_KEYS.ID_CASETA,
          activationRes.id_caseta,
        );
        AsyncStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_CODE, accessCode);
        AsyncStorage.setItem(LOCAL_STORAGE_KEYS.DB_CODE, dbCode);
        navigation.replace(ROUTES.HOME);
      }
    } catch (error: any) {
      await endSession();
      errorFallback();
      dispatch(
        setShowAlert({
          showAlert: true,
          title: getLabelApp("es", "app_error_message_title"),
          message: `${error}`,
          type: ALERT_TYPES.ERROR,
        }),
      );
      return;
    }
  };

export const twoWayAuthentication =
  (dbCode: string, accessCode: string, navigation: any, callback: () => void) =>
  async (dispatch: any) => {
    try {
      const authRes = await InitializeConnection(dbCode);
      if (authRes.status !== 200) {
        throw new Error("Código de base de datos erróneo o inactivo.");
      }
      const loginRes = await login(accessCode);
      if (["200", 200].includes(loginRes.code)) {
        navigation.replace(ROUTES.HOME);
      } else {
        throw new Error(getLabelApp("es", "app_error_message"));
      }
    } catch (error) {
      await endSession();
      callback();
      dispatch(
        setShowAlert({
          showAlert: true,
          title: getLabelApp("es", "app_error_message_title"),
          message: `${error}`,
          type: ALERT_TYPES.ERROR,
        }),
      );
    }
  };
