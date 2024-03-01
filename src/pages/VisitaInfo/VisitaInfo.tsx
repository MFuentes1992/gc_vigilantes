import React, { useEffect, useState } from "react";

import RadioGroup from "@gcVigilantes/Components/RadioGroup";
import {
	View,
	SafeAreaView,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Text,
	Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { VehicleInfo } from "@gcVigilantes/Components/VehicleInfo/VehicleInfo";
import { GuestPicker } from "@gcVigilantes/Components/GuestPicker/GuestPicker";
import { Switcher } from "@gcVigilantes/Components/Switcher/Switcher";
import { VisitaDetails } from "@gcVigilantes/Components/VisitaDetails/VisitaDetails";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { TABS, card_styles } from "./constants";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { MainInfo } from "./MainInfo";
import { FormSaveButtons } from "@gcVigilantes/Components/FormSaveButtons/FormSaveButtons";
import { DateInfo } from "./DateInfo";
import { GuestInfo } from "./GuestInfo";

export const VisitaInfo = ({ navigation, route }: any) => {
	const { uniqueID, uri } = route.params;
	const [tab, setTab] = useState<string>(TABS.MAIN);
	const [formValues, setFormValues] = useState({
		fromDate: new Date().toISOString(),
		toDate: new Date().toISOString(),
		dateType: "",
		fromHour: new Date().getHours(),
		toHour: new Date().getHours(),
		hourType: "",
		tipo_ingreso: "",
		vehicle_model: "",
		vehicle_color: "",
		vehicle_plate: "",
		multiple_entrada: false,
		notificaciones: false,
	});

	const dispatch = useDispatch();
	const { catalogVisitas } = useSelector(
		(state: RootState) => state.tipoVisitas
	);
	const { catalogIngreso } = useSelector(
		(state: RootState) => state.tipoIngreso
	);
	useEffect(() => {
		dispatch(getCatalogTipoVisitas() as any);
		dispatch(getCatalogTipoIngreso() as any);
	}, []);
	return (
		<SafeAreaView>
			<ScrollView>
				<VisitaDetails
					uri={uri}
					autor='analisis@dasgalu.com.mx'
					direccion='Paseos de Tezoyuca, Benito Juarez, Morelos'
					estatus='Activa'
					notificaciones={formValues.notificaciones}
					handleNotificaciones={(value) => {
						setFormValues((prev) => ({ ...prev, notificaciones: value }));
					}}
					handleChangeTab={(tab) => setTab(tab)}
				/>
				{/** Main tab: Nombre visita, tipo visita, tipo Ingreso  */}
				{tab === TABS.MAIN && (
					<MainInfo
						catalogVisitas={catalogVisitas}
						catalogIngreso={catalogIngreso}
					/>
				)}
				{tab === TABS.DATE && <DateInfo />}
				{tab === TABS.GUEST && <GuestInfo />}
				<FormSaveButtons />
			</ScrollView>
		</SafeAreaView>
	);
};
