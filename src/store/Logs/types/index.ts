export type LogItem = {
  id_visita: string;
  id_bitacora: string;
  id_instalacion: string;
  id_tipo_visita: string;
  id_tipo_ingreso: string;
  tipo_visita: string;
  tipo_ingreso: string;
  seccion: string;
  numero: string;
  nombre_visita: string;
  fecha_lectura: string;
  uniqueID: string;
};

export type Logs = {
  logs: LogItem[];
};
