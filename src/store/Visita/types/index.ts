import { VisitaPeaton } from "@gcVigilantes/pages/VisitaInfo/constants";

export type VehiclesResType = {
  id?: string;
  idVisita?: string;
  conductor: string;
  marca: string;
  modelo: string;
  anio: string;
  placas: string;
  color: string;
  fechaRegistro?: string;
  fechaActualizacion?: string;
  estatusRegistro?: string;
};

export interface IVisita {
  visitaId: string;
  idTipoVisita: string;
  idTipoIngreso: string;
  idUsuario: string;
  fechaIngreso: string;
  fechaSalida: string;
  multiple: string;
  notificaciones: string;
  appGenerado: string;
  vigenciaQR: string;
  uniqueId: string;
  autor: string;
  emailAutor: string;
  residencialSeccion: string;
  residencialNumInterior: string;
  residencialNumExterior: string;
  residencialCalle: string;
  residencialColonia: string;
  residencialCiudad: string | null;
  residencialEstado: string;
  residencialCP: string;
  residencialNombre: string;
  nombre: string;
  estatusVisita: string;
  vehicles: VehiclesResType[];
  pedestrians: VisitaPeaton[];
}
