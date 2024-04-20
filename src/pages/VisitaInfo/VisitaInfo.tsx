import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
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

export const VisitaInfo = ({ navigation, route }: any) => {
	const { uniqueID, uri } = route.params;
	const [tab, setTab] = useState<string>(TABS.MAIN);
	// -- const [formValues, setformValues] = useState<IVisita>();
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
		tipo_visita: "",
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
			setFormValues(() => ({
				nameAutor: visitaRedux.nameAutor,
				emailAutor: visitaRedux.emailAutor,
				residencial: visitaRedux.residencial,
				calle: visitaRedux.calle,
				num_ext: visitaRedux.num_ext,
				nombre_visita: visitaRedux.nombre,
				estado: visitaRedux.estado,
				num_int: visitaRedux.num_int,
				seccion: visitaRedux.seccion,
				fromDate: visitaRedux.desde,
				toDate: visitaRedux.hasta,
				dateType: visitaRedux.tipo_fecha,
				fromHour: visitaRedux.hora_desde,
				toHour: visitaRedux.hora_hasta,
				hourType: visitaRedux.tipo_hora,
				tipo_ingreso: visitaRedux.tipo_ingreso,
				tipo_visita: visitaRedux.tipo_visita,
				multiple_entrada: visitaRedux.multiple_entrada,
				notificaciones: visitaRedux.notificaciones,
			}));
		}
	}, [visitaRedux]);

	console.log("formValues", formValues);

	return (
		<SafeAreaView>
			<ScrollView>
				<VisitaDetails
					uri={uri}
					autor={formValues?.nameAutor || ""}
					emailAutor={formValues?.emailAutor || ""}
					direccion={`${formValues?.residencial}, ${formValues?.calle}, ${formValues?.num_ext}`}
					estatus={formValues?.estado || ""}
					notificaciones={formValues?.notificaciones === SWITCHER_VALUES.TRUE}
					handleNotificaciones={(value) => {
						setFormValues((prev) => ({ ...prev, notificaciones: value }));
					}}
					handleChangeTab={(tab) => setTab(tab)}
					num_int={formValues?.num_int || ""}
					seccion={formValues?.seccion || ""}
					selectedTab={tab}
				/>
				{/** Main tab: Nombre visita, tipo visita, tipo Ingreso  */}
				{tab === TABS.MAIN && (
					<MainInfo
						catalogVisitas={catalogVisitas}
						catalogIngreso={catalogIngreso}
						tipoVisita={formValues?.tipo_visita || ""}
						tipoIngreso={formValues?.tipo_ingreso || ""}
						nombreVisita={formValues?.nombre_visita || ""}
						handleOnChange={handleOnChange}
					/>
				)}
				{tab === TABS.DATE && (
					<DateInfo
						fromDate={formValues?.fromDate}
						toDate={formValues?.toDate}
					/>
				)}
				{tab === TABS.GUEST && <GuestInfo />}
				{tab === TABS.SETTINGS && (
					<SettingsInfo
						autor={formValues?.emailAutor || ""}
						uniqueID={uniqueID}
						seccion={formValues?.seccion || ""}
						num_int={formValues?.num_int || ""}
						residencial={formValues?.residencial || ""}
						calle={formValues?.calle || ""}
						num_ext={formValues?.num_ext || ""}
						colonia={formValues?.colonia || ""}
						ciudad={formValues?.ciudad || ""}
						estado={formValues?.estado || ""}
						cp={formValues?.cp || ""}
						notificaciones={formValues?.notificaciones === SWITCHER_VALUES.TRUE}
						multiple_entrada={
							formValues?.multiple_entrada === SWITCHER_VALUES.TRUE
						}
						handleOnchange={handleOnChange}
					/>
				)}
				<FormSaveButtons onCancel={() => {}} onSave={() => {}} />
			</ScrollView>
		</SafeAreaView>
	);
};
