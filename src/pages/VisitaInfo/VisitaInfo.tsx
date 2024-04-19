import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { VisitaDetails } from "@gcVigilantes/Components/VisitaDetails/VisitaDetails";
import { SWITCHER_VALUES, TABS } from "./constants";
import { MainInfo } from "./MainInfo";
import { FormSaveButtons } from "@gcVigilantes/Components/FormSaveButtons/FormSaveButtons";
import { DateInfo } from "./DateInfo";
import { GuestInfo } from "./GuestInfo";
import { SettingsInfo } from "./SettingsInfo";
import {
	getVehicles,
	getVisitaByUniqueID,
} from "@gcVigilantes/store/Visita/api";
import { IVisita } from "@gcVigilantes/store/Visita/types";

export const VisitaInfo = ({ navigation, route }: any) => {
	const { uniqueID, uri } = route.params;
	const [tab, setTab] = useState<string>(TABS.MAIN);
	const [visitaData, setVisitaData] = useState<IVisita>();
	const [formValues, setFormValues] = useState<{
		[key: string]: string | boolean | any;
	}>({
		nombre_visita: "",
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
	const visitaRedux = useSelector((state: RootState) => state.visita);
	const Tab = createBottomTabNavigator();

	useEffect(() => {
		dispatch(getCatalogTipoVisitas() as any);
		dispatch(getCatalogTipoIngreso() as any);
		dispatch(getVisitaByUniqueID(uniqueID) as any);
		dispatch(getVehicles(uniqueID) as any);
	}, []);

	const handleOnChange = (key: string, value: string) => {
		setFormValues((prev) => {
			const tmp = { ...prev };
			tmp[key] = value;
			return tmp;
		});
	};

	useEffect(() => {
		if (visitaRedux) {
			setVisitaData(visitaRedux);
		}
	}, [visitaRedux]);

	console.log("formValues", formValues);

	return (
		<SafeAreaView>
			<ScrollView>
				<VisitaDetails
					uri={uri}
					autor={visitaData?.nameAutor || ""}
					emailAutor={visitaData?.emailAutor || ""}
					direccion={`${visitaData?.residencial}, ${visitaData?.calle}, ${visitaData?.num_ext}`}
					estatus={visitaData?.estado || ""}
					notificaciones={visitaData?.notificaciones === SWITCHER_VALUES.TRUE}
					handleNotificaciones={(value) => {
						setFormValues((prev) => ({ ...prev, notificaciones: value }));
					}}
					handleChangeTab={(tab) => setTab(tab)}
					num_int={visitaData?.num_int || ""}
					seccion={visitaData?.seccion || ""}
					selectedTab={tab}
				/>
				{/** Main tab: Nombre visita, tipo visita, tipo Ingreso  */}
				{tab === TABS.MAIN && (
					<MainInfo
						catalogVisitas={catalogVisitas}
						catalogIngreso={catalogIngreso}
						tipoVisita={visitaData?.tipo_visita || ""}
						tipoIngreso={visitaData?.tipo_ingreso || ""}
						nombreVisita={visitaData?.nombre || ""}
						handleOnChange={handleOnChange}
					/>
				)}
				{tab === TABS.DATE && (
					<DateInfo fromDate={visitaData?.desde} toDate={visitaData?.hasta} />
				)}
				{tab === TABS.GUEST && <GuestInfo />}
				{tab === TABS.SETTINGS && (
					<SettingsInfo
						autor={visitaData?.emailAutor || ""}
						uniqueID={uniqueID}
						seccion={visitaData?.seccion || ""}
						num_int={visitaData?.num_int || ""}
						residencial={visitaData?.residencial || ""}
						calle={visitaData?.calle || ""}
						num_ext={visitaData?.num_ext || ""}
						colonia={visitaData?.colonia || ""}
						ciudad={visitaData?.ciudad || ""}
						estado={visitaData?.estado || ""}
						cp={visitaData?.cp || ""}
						notificaciones={visitaData?.notificaciones === SWITCHER_VALUES.TRUE}
						multiple_entrada={
							visitaData?.multiple_entrada === SWITCHER_VALUES.TRUE
						}
					/>
				)}
				<FormSaveButtons onCancel={() => {}} onSave={() => {}} />
			</ScrollView>
		</SafeAreaView>
	);
};
