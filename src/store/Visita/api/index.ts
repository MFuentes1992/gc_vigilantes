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

export const updateVisita =
	(visita: { [key: string]: any }) => (dispatch: any) => {
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
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};
