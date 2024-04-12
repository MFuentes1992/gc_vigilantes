import lang_es from "@gcVigilantes/utils/Messages/lang_esp.json";

export const ENDPOINTS = {
	BASE_URL: "https://apimovilgc.dasgalu.net",
	CATALOG_TIPO_VISITAS: "/visita/catalogs/GetTipoVisita/index.php",
	CATALOG_TIPO_INGRESO: "/visita/catalogs/GetTipoIngreso/index.php",
	VISITAS: {
		BY_UNIQUEID: "/visita/read-qr/index.php?qr={qr}",
		VEHICLES: "/visita/getVisitVehicles/index.php?qr={qr}",
	},
	VIGILANTE: {
		CODE: "/vigilante/activationCode/index.php",
	},
};

export const ROUTES = {
	ACTIVATION_CODE: "activation-code",
	HOME: "Vigilante-qr",
	VISIT_INFO: "VisitaInfo",
	CAMERA: "Camera",
};

const TIME_ZONES = {
	CST: {
		id: 6,
		label: "Hora del centro",
	},
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
