import { ENDPOINTS } from "@gcVigilantes/utils";
import { setVisita } from "@gcVigilantes/store/Visita";
import { IVisita } from "../types";

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
