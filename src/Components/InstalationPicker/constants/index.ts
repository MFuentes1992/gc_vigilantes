import { Instalacion } from "@gcVigilantes/store/Vigilancia/types";

export type InstalationPickerProps = {
  instalaciones: Instalacion[];
  selectedInstalacion: Instalacion;
  handleOnChange: (instalacion: string) => void;
};
