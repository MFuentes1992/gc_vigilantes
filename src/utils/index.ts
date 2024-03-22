export const ENDPOINTS = {
	BASE_URL: "https://apimovilgc.dasgalu.net",
	CATALOG_TIPO_VISITAS: "/visita/catalogs/GetTipoVisita/index.php",
	CATALOG_TIPO_INGRESO: "/visita/catalogs/GetTipoIngreso/index.php",
	VISITAS: {
		BY_UNIQUEID: "/visita/read-qr/index.php?qr={qr}",
		VEHICLES: "/visita/getVisitVehicles/index.php?qr={qr}",
	},
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
