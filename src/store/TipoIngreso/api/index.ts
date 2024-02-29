import { ENDPOINTS } from "@gcVigilantes/utils";
import { setCatalogIngreso } from "@gcVigilantes/store/TipoIngreso";
import { TTipoIngreso } from "@gcVigilantes/store/TipoIngreso/types";
import fakeApi from "@gcVigilantes/store/TipoIngreso/api/fakeApi.json";

export const getCatalogTipoIngreso = () => async (dispatch: any) => {
	fetch(`${ENDPOINTS.BASE_URL}${ENDPOINTS.CATALOG_TIPO_INGRESO}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			dispatch(setCatalogIngreso(fakeApi as TTipoIngreso[]));
		})
		.catch((error) => {
			console.error(error);
		});
};
