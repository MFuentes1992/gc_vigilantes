import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { RootState } from "@gcVigilantes/store";
import { getCatalogTipoIngreso } from "@gcVigilantes/store/TipoIngreso/api";
import { VisitaDetails } from "@gcVigilantes/Components/VisitaDetails/VisitaDetails";
import { TABS } from "./constants";
import { MainInfo } from "./MainInfo";
import { FormSaveButtons } from "@gcVigilantes/Components/FormSaveButtons/FormSaveButtons";
import { DateInfo } from "./DateInfo";
import { GuestInfo } from "./GuestInfo";
import { SettingsInfo } from "./SettingsInfo";
import { getVisitaByUniqueID } from "@gcVigilantes/store/Visita/api";

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
	const visitaData = useSelector((state: RootState) => state.visita);

	useEffect(() => {
		dispatch(getCatalogTipoVisitas() as any);
		dispatch(getCatalogTipoIngreso() as any);
		dispatch(getVisitaByUniqueID(uniqueID) as any);
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				<VisitaDetails
					uri={uri}
					autor={visitaData.nameAutor}
					emailAutor={visitaData.emailAutor}
					direccion={`${visitaData.residencial}, ${visitaData.calle}, ${visitaData.num_ext}`}
					estatus={visitaData.estado}
					notificaciones={formValues.notificaciones}
					handleNotificaciones={(value) => {
						setFormValues((prev) => ({ ...prev, notificaciones: value }));
					}}
					handleChangeTab={(tab) => setTab(tab)}
					num_int={visitaData.num_int}
					seccion={visitaData.seccion}
				/>
				{/** Main tab: Nombre visita, tipo visita, tipo Ingreso  */}
				{tab === TABS.MAIN && (
					<MainInfo
						catalogVisitas={catalogVisitas}
						catalogIngreso={catalogIngreso}
						tipoVisita={visitaData.tipo_visita}
						tipoIngreso={visitaData.tipo_ingreso}
						nombreVisita={visitaData.nombre}
					/>
				)}
				{tab === TABS.DATE && <DateInfo />}
				{tab === TABS.GUEST && <GuestInfo />}
				{tab === TABS.SETTINGS && (
					<SettingsInfo
						autor={visitaData.emailAutor}
						uniqueID={uniqueID}
						seccion={visitaData.seccion}
						num_int={visitaData.num_int}
						residencial={visitaData.residencial}
						calle={visitaData.calle}
						num_ext={visitaData.num_ext}
						colonia={visitaData.colonia}
						ciudad={visitaData.ciudad}
						estado={visitaData.estado}
						cp={visitaData.cp}
					/>
				)}
				<FormSaveButtons />
			</ScrollView>
		</SafeAreaView>
	);
};
