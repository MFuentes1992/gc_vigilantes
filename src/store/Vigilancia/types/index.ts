export type Instalacion = {
  idInstalacion: string;
  seccion: string;
  numInt: string;
  idUsuario: string;
  owner: string;
};

export type TCasetaInfo = {
  logoUrl: string;
  residenceId: string;
  residenceName: string;
  residenceAddress: string;
  residenceMobile: string;
  residencePhone: string;
  residenceExt: string;
  instalaciones: Instalacion[];
};
