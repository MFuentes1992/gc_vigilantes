import { ENDPOINTS } from "@gcVigilantes/utils";
import { setVisita } from "@gcVigilantes/store/Visita";
import { IVisita } from "../types";
import data_mock from "./data.json";

export const getVisitaByUniqueID = (uniqueID: string) => (dispatch: any) => {
	const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.VISITAS.BY_UNIQUEID.replace(
		"{qr}",
		uniqueID
	)}`;
	dispatch(setVisita(data_mock as IVisita));
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			console.log("Visita data", data);
			// dispatch(setVisita(data_mock as IVisita));
		})

		.catch((error) => {
			console.error("Error:", error);
		});
};
