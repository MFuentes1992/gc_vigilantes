import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
  database_code: "",
  access_code: "",
  id_caseta: 0,
  name: "",
  residence: "",
  id: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<typeof initialState>) => {
      state.access_code = action.payload.access_code;
      state.access_token = action.payload.access_token;
      state.database_code = action.payload.database_code;
      state.id_caseta = action.payload.id_caseta;
      state.name = action.payload.name;
      state.residence = action.payload.residence;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});
export const { setUserData, logout } = userDataSlice.actions;
export default userDataSlice.reducer;
