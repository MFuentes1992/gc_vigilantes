import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TCasetaInfo } from "./types";

const initialState: TCasetaInfo = {
  logoUrl: "https://via.placeholder.com/150",
  residenceName: "",
  residenceAddress: "",
  residenceMobile: "",
  residencePhone: "",
  residenceExt: "",
};

const vigilanciaSlice = createSlice({
  name: "vigilancia",
  initialState,
  reducers: {
    setCasetaInfo(state, action: PayloadAction<TCasetaInfo>) {
      state.logoUrl = action.payload.logoUrl;
      state.residenceName = action.payload.residenceName;
      state.residenceAddress = action.payload.residenceAddress;
      state.residenceMobile = action.payload.residenceMobile ?? "";
      state.residencePhone = action.payload.residencePhone ?? "";
      state.residenceExt = action.payload.residenceExt || "";
    },
    clearCasetaInfo(state) {
      state = initialState;
    },
  },
});

export const { setCasetaInfo, clearCasetaInfo } = vigilanciaSlice.actions;

export default vigilanciaSlice.reducer;
