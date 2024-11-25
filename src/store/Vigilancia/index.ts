import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Instalacion, TCasetaInfo } from "./types";

const initialState: TCasetaInfo = {
  logoUrl: "https://via.placeholder.com/150",
  residenceName: "",
  residenceId: "",
  residenceAddress: "",
  residenceMobile: "",
  residencePhone: "",
  residenceExt: "",
  instalaciones: [],
};

const vigilanciaSlice = createSlice({
  name: "vigilancia",
  initialState,
  reducers: {
    setCasetaInfo(state, action: PayloadAction<TCasetaInfo>) {
      state.logoUrl = action.payload.logoUrl;
      state.residenceId = action.payload.residenceId;
      state.residenceName = action.payload.residenceName;
      state.residenceAddress = action.payload.residenceAddress;
      state.residenceMobile = action.payload.residenceMobile ?? "";
      state.residencePhone = action.payload.residencePhone ?? "";
      state.residenceExt = action.payload.residenceExt || "";
    },
    clearCasetaInfo(state) {
      state = initialState;
    },
    setInstalaciones(state, action: PayloadAction<Instalacion[]>) {
      state.instalaciones = action.payload;
    },
  },
});

export const { setCasetaInfo, clearCasetaInfo, setInstalaciones } =
  vigilanciaSlice.actions;

export default vigilanciaSlice.reducer;
