import { ALERT_TYPES } from "@gcVigilantes/Components/Alerts/constants";
import { setShowAlert } from "@gcVigilantes/store/Alerts";
import {
  ENDPOINTS,
  getLabelApp,
  LOCAL_STORAGE_KEYS,
  promiseQueuer,
  ROUTES,
} from "@gcVigilantes/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// -- REMOVE DEFAULT PARAMS
export const InitializeConnection = async (dbCode: string) => {
  const formdata = new FormData();
  formdata.append("prefix", "u579469339");
  formdata.append("code", dbCode);
  const requestOptions = {
    method: "POST",
    body: formdata,
  };
  const response = await fetch(`${ENDPOINTS.BASE_URL}`, requestOptions);
  return response.json();
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
    requestOptions
  );
  return res.json();
};

/**
 *
 * @param dbCode
 * @param accessCode
 * @returns 3-way authentication results, index 2 is instalation code.
 */
export const threeWayAuthentication =
  (dbCode: string, accessCode: string, navigation: any) =>
  async (dispatch: any) => {
    try {
      const initRes = await InitializeConnection(dbCode);
      const loginRes = await login(accessCode);
      const activationRes = await getActivationCode(accessCode);

      if (["203", 203].includes(activationRes.code)) {
        throw new Error("Invalid activation code");
      }

      if (activationRes) {
        AsyncStorage.setItem(
          LOCAL_STORAGE_KEYS.INSTALATION_TOKEN,
          activationRes.token_instalacion
        );
        AsyncStorage.setItem(
          LOCAL_STORAGE_KEYS.ID_CASETA,
          activationRes.id_caseta
        );
        AsyncStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_CODE, accessCode);
        AsyncStorage.setItem(LOCAL_STORAGE_KEYS.DB_CODE, dbCode);
        navigation.replace(ROUTES.HOME);
      }
    } catch (error) {
      dispatch(
        setShowAlert({
          showAlert: true,
          title: getLabelApp("es", "app_error_message_title"),
          message: getLabelApp("es", "app_error_message"),
          type: ALERT_TYPES.ERROR,
        })
      );
    }
  };

export const twoWayAuthentication =
  (dbCode: string, accessCode: string, navigation: any) =>
  async (dispatch: any) => {
    try {
      const initRes = await InitializeConnection(dbCode);
      const loginRes = await login(accessCode);
      if (["200", 200].includes(loginRes.code)) {
        navigation.replace(ROUTES.HOME);
      }
    } catch (error) {
      dispatch(
        setShowAlert({
          showAlert: true,
          title: getLabelApp("es", "app_error_message_title"),
          message: getLabelApp("es", "app_error_message"),
          type: ALERT_TYPES.ERROR,
        })
      );
    }
  };
