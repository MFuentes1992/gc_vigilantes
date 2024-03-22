import { ENDPOINTS } from "@gcVigilantes/utils";
import { setVisita, setVehicles } from "@gcVigilantes/store/Visita";
import { IVisita, VehiclesResType } from "../types";
import data_mock from "./data.json";

export const getVisitaByUniqueID = (uniqueID: string) => (dispatch: any) => {
	const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.BY_UNIQUEID.replace(
		"{qr}",
		uniqueID
	)}`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			dispatch(setVisita(data as IVisita));
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
