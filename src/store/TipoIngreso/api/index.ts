import { ENDPOINTS } from "@gcVigilantes/utils";
import { setCatalogIngreso } from "@gcVigilantes/store/TipoIngreso";
import { TTipoIngreso } from "@gcVigilantes/store/TipoIngreso/types";

export const getCatalogTipoIngreso = () => async (dispatch: any) => {
	fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CATALOG_TIPO_INGRESO}`)
		.then((res) => res.json())
		.then((data) => {
			dispatch(setCatalogIngreso(data as TTipoIngreso[]));
		})
		.catch((error) => {
			console.error(error);
		});
};
