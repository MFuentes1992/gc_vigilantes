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
  id_tipo_ingreso: string;
  multiple_entrada: string;
  notificaciones: string;
  nameAutor: string;
  emailAutor: string;
  id_tipo_visita: string;
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
  estatus_registro: string;
  vehicles: VehiclesResType[];
  [key: string]: string | VehiclesResType[];
}
