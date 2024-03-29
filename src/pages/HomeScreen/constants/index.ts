import { ENDPOINTS } from "@gcVigilantes/utils";

// -- REMOVE DEFAULT PARAMS
export const InitializeConnection = async (
	email: string,
	password: string,
	customerCode: string,
	callback: any
) => {
	const formdata = new FormData();
	formdata.append("prefix", "u579469339");
	formdata.append("code", customerCode);
	const requestOptions = {
		method: "POST",
		body: formdata,
	};
	const response = await fetch(`${ENDPOINTS.BASE_URL}`, requestOptions);

	if (response.status === 200) {
		const res = await callback(email, password);
		if (res.code === "200" && res.access_token) return res;
		else throw new Error(res.message);
	}
};

export const authenticate = async (email: string, password: string) => {
	const formdata = new FormData();
	formdata.append("email", email);
	formdata.append("password", password);

	const requestOptions = {
		method: "POST",
		body: formdata,
		Headers: {
			"content-type": "multipart/form-data",
		},
	};

	try {
		const response = await fetch(
			`${ENDPOINTS.BASE_URL}/?login`,
			requestOptions
		);
		if (!response.ok) {
			// logout();
			throw new Error("Falló la conexión.");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
};
