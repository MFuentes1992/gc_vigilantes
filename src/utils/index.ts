import { TABS } from "@gcVigilantes/pages/VisitaInfo/constants";
import lang_es from "@gcVigilantes/utils/Messages/lang_esp.json";

export const ENDPOINTS = {
  BASE_URL: "https://apimovilgc.dasgalu.net",
  WEB_SERVER: "https://gcdemo.dasgalu.net",
  QR: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=",
  CATALOG_TIPO_VISITAS: "/visita/catalogs/GetTipoVisita/index.php",
  CATALOG_TIPO_INGRESO: "/visita/catalogs/GetTipoIngreso/index.php",
  VISITAS: {
    CREATE: "/visita/crear/index.php",
    BY_UNIQUEID: "/visita/consulta/uniqueId/index.php",
    VEHICLES: "/visita/getVisitVehicles/index.php?qr={qr}",
    UPDATE: "/visita/update/index.php",
    LOG_INGRESS: "/visita/read-qr/index.php",
  },
  VIGILANTE: {
    CODE: "/vigilante/activationCode/index.php",
    INFO: "/vigilante/caseta-info/index.php",
    LOGS: "/vigilante/logs/by-caseta/index.php",
    INSTALACIONES: "/vigilante/instalaciones/index.php",
  },
};

export const ROUTES = {
  ACTIVATION_CODE: "activation-code",
  HOME: "home-screen",
  QR: "Vigilante-qr",
  VISIT_INFO: "VisitaInfo",
  CAMERA: "Camera",
  LOGS: "logs",
};

export const formRouter = (idTipoIngreso: string) => ({
  [TABS.MAIN]: {
    next: ["1"].includes(idTipoIngreso) ? TABS.VEHICLES : TABS.DATE,
    back: "",
  },
  [TABS.VEHICLES]: {
    next: TABS.DATE,
    back: TABS.MAIN,
  },
  [TABS.DATE]: {
    next: ["2"].includes(idTipoIngreso) ? TABS.GUEST : TABS.SETTINGS,
    back: ["1"].includes(idTipoIngreso) ? TABS.VEHICLES : TABS.MAIN,
  },
  [TABS.GUEST]: {
    next: TABS.SETTINGS,
    back: TABS.DATE,
  },
  [TABS.SETTINGS]: {
    next: "",
    back: ["2"].includes(idTipoIngreso) ? TABS.GUEST : TABS.DATE,
  },
});

const TIME_ZONES = {
  CST: {
    id: 6,
    label: "Hora del centro",
  },
};

export const LOCAL_STORAGE_KEYS: { [key: string]: string } = {
  INSTALATION_TOKEN: "Instalation_Token",
  ACCESS_CODE: "Access_Code",
  DB_CODE: "DB_Code",
  ID_CASETA: "id_caseta",
};

export const getTimeZone = (offset: number) => {
  const diffHrs = offset / 60;
  const hours = Math.floor(diffHrs);
  const tz = Object.values(TIME_ZONES).find((tz) => tz.id === hours);
  return tz?.label;
};

export const timeFormat = (time: number) =>
  time < 10 ? `0${time}` : time.toString();

export const timeZone = "es-MX";
export const dateFormat = "YYYY-MM-DD";

export const getLabelApp = (lang: string, key: string) => {
  let language = "";
  switch (lang) {
    case "es":
      language = JSON.stringify(lang_es);
      break;
    default:
      language = JSON.stringify(lang_es);
      break;
  }
  const labels = JSON.parse(language);
  return labels[key];
};

export const militarToTwelveHours = (hour: string) => {
  const hourInt = parseInt(hour.split(":")[0]);
  const ampm = hourInt >= 12 ? "PM" : "AM";
  if (hourInt > 12) {
    return `${hourInt - 12}:${hour.split(":")[1]} ${ampm}`;
  }
  return `${hourInt}:${hour.split(":")[1]} ${ampm}`;
};

export const toMilitarHours = (hour: string) => {
  const hourInt = parseInt(hour.split(":")[0]);
  if (hour.includes("PM") && hourInt < 12) {
    return `${hourInt + 12}:${hour
      .split(":")[1]
      .replace(/AM|PM/g, "")
      .replace(/\s/g, ":00")}`;
  }
  return `${hour.replace(/AM|PM/g, "").replace(/\s/g, ":00")}`;
};

export const stringTemplateAddQuery = (cadena: string, object: any) => {
  cadena += "?";
  Object.keys(object).forEach((key) => {
    if (object[key] === "" || object[key] === undefined) return;
    cadena += `${key}=${object[key]}&`;
  });
  cadena = cadena.slice(0, -1);
  return cadena;
};

/*
  Function to format the hour
  @param time: number in miliseconds
  @returns string 12 hrs am/pm
*/
export const hourFormat = (time: number) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // onst { hour, ampm } = militarToTwelveHours(hours);
  // return `${hour}:${timeFormat(minutes)} ${ampm}`;
  return "";
};

export const loadAsyncStorageData = async (
  keys: string[],
  AsyncStorage: any,
) => {
  const promises = keys.map((key) => AsyncStorage.getItem(key));
  const results: { [key: string]: string | number }[] = [];
  const values = await Promise.all(promises);
  keys.forEach((key, index) => {
    results.push({ [key]: values[index] });
  });
  return results;
};

export const promiseQueuer = async (promises: any[], params: any[]) => {
  let results: any[] = [];
  promises.forEach(async (promise, index) => {
    const res = await promise(params[index]);
    results.push(res);
  });
  return results;
};

export const datePoller = (callback: () => void) => {
  setInterval(() => {
    callback();
  }, 1000);
};

export const visitaNavigatorForward = (tab: string, idTipoIngreso: string) => {
  return formRouter(idTipoIngreso)[tab].next;
};

export const visitaNavigatorBack = (tab: string, idTipoIngreso: string) => {
  return formRouter(idTipoIngreso)[tab].back;
};

export const validateForm = (form: any) => {
  const errors = {} as any;
  Object.keys(form).forEach((key) => {
    if (form[key] === "" || form[key] === undefined) {
      errors[key] = { required: true };
    } else if (Array.isArray(form[key]) && form[key].length === 0) {
      errors[key] = { required: true };
    } else if (Array.isArray(form[key])) {
      form[key].forEach((item: any) => {
        Object.keys(item).forEach((subkey: string) => {
          if (item[subkey] === "" || item[subkey] === undefined) {
            errors[key] = { required: true };
          }
        });
      });
    }
  });
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
