import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TipoVisitas from "./TipoVisitas";
import UserData from "./UserData";
import TipoIngreso from "./TipoIngreso";
import Visita from "./Visita";
import UserPreferences from "./UserPreferences";
import Alerts from "./Alerts";
import UI from "./UI";
import Auth from "./Login";
import Vigilancia from "./Vigilancia";
import Pagination from "./Pagination";

const persistConfig = {
  storage: AsyncStorage,
  key: "root",
};
const rootReducer = combineReducers({
  tipoVisitas: TipoVisitas,
  userData: UserData,
  tipoIngreso: TipoIngreso,
  visita: Visita,
  preferences: UserPreferences,
  alerts: Alerts,
  ui: UI,
  auth: Auth,
  vigilancia: Vigilancia,
  pagination: Pagination,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
