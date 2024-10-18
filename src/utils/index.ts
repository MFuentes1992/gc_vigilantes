import lang_es from "@gcVigilantes/utils/Messages/lang_esp.json";

export const ENDPOINTS = {
  BASE_URL: "https://apimovilgc.dasgalu.net",
  WEB_SERVER: "https://gcdemo.dasgalu.net",
  QR: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=",
  CATALOG_TIPO_VISITAS: "/visita/catalogs/GetTipoVisita/index.php",
  CATALOG_TIPO_INGRESO: "/visita/catalogs/GetTipoIngreso/index.php",
  VISITAS: {
    BY_UNIQUEID: "/visita/read-qr/index.php",
    VEHICLES: "/visita/getVisitVehicles/index.php?qr={qr}",
    UPDATE: "/visita/update/index.php",
    LOG_INGRESS: "/visita/read-qr/index.php",
  },
  VIGILANTE: {
    CODE: "/vigilante/activationCode/index.php",
    INFO: "/vigilante/caseta-info/index.php",
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

export const militarToTwelveHours = (
  hour: number
): { hour: number; ampm: string } => {
  const ampm = hour >= 12 ? "PM" : "AM";
  if (hour > 12) {
    return {
      hour: hour - 12,
      ampm,
    };
  }
  return {
    hour,
    ampm,
  };
};

export const toMilitarHours = (hour: number, ampm: string) => {
  if (ampm === "PM") {
    return hour + 12;
  }
  return hour;
};

export const stringTemplateAddQuery = (cadena: string, object: any) => {
  cadena += "?";
  Object.keys(object).forEach((key) => {
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
  const { hour, ampm } = militarToTwelveHours(hours);
  return `${hour}:${timeFormat(minutes)} ${ampm}`;
};

export const loadAsyncStorageData = async (
  keys: string[],
  AsyncStorage: any
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
