import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TipoVisitas from "./TipoVisitas";
import UserData from "./UserData";
import TipoIngreso from "./TipoIngreso";
import Visita from "./Visita";

const persistConfig = {
	storage: AsyncStorage,
	key: "root",
};
const rootReducer = combineReducers({
	tipoVisitas: TipoVisitas,
	userData: UserData,
	tipoIngreso: TipoIngreso,
	visita: Visita,
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
