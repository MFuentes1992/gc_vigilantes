export type VehiclesResType = {
	vehicle_id: string;
	marca: string;
	modelo: string;
	anio: string;
	placas: string;
	color: string;
};

export interface IVisita {
	visita_id: string;
	nombre: string;
	desde: string;
	hasta: string;
	tipo_ingreso: string;
	tipoIngresoText: string;
	multiple_entrada: string;
	notificaciones: string;
	nameAutor: string;
	emailAutor: string;
	tipo_visita: string;
	tipoVisitaText: string;
	uniqueID: string;
	seccion: string;
	num_int: string;
	residencial: string;
	calle: string;
	num_ext: string;
	colonia: string;
	ciudad: string;
	estado: string;
	cp: string;
	vehicles: VehiclesResType[];
	[key: string]: string | VehiclesResType[];
}
