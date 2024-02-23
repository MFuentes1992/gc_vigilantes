import { ENDPOINTS } from "@gcVigilantes/utils";
import { setTipoVisita } from "..";
import { TipoVisita } from "../types";

export const getCatalogTipoVisitas = () => (dispatch: any) => {
	const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.CATALOG_TIPO_VISITAS}`;
	fetch(url)
		.then((response: any) => {
			response
				.json()
				.then((data: TipoVisita[]) => {
					dispatch(setTipoVisita(data));
				})
				.catch((error: any) => {
					console.log("error", error);
				});
		})
		.catch((error) => {
			console.error("error", error);
		});
};
