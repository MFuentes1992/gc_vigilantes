import React, { useEffect } from "react";
import {
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import RadioGroup from "@gcVigilantes/Components/RadioGroup";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCatalogTipoVisitas } from "@gcVigilantes/store/TipoVisitas/api";
import { RootState } from "@gcVigilantes/store";

export const TipoVisitasIcon: { [key: string]: React.ReactNode } = {
	Visita: <FontAwesome name='user' size={24} color='darkgray' />,
	Provedor: <FontAwesome name='truck' size={24} color='darkgray' />,
	["Servicio domestico"]: (
		<FontAwesome name='wrench' size={24} color='darkgray' />
	),
	["Vehículo"]: <FontAwesome name='car' size={24} color='darkgray' />,
	Peatonal: <FontAwesome5 name='walking' size={24} color='darkgray' />,
	single: <FontAwesome name='user' size={24} color='darkgray' />,
	multiple: (
		<MaterialCommunityIcons
			name='account-multiple-plus'
			size={24}
			color='black'
		/>
	),
};

export const VisitaInfo = () => {
	const dispatch = useDispatch();
	const { catalogVisitas } = useSelector(
		(state: RootState) => state.tipoVisitas
	);
	useEffect(() => {
		dispatch(getCatalogTipoVisitas() as any);
	}, []);
	return (
		<SafeAreaView>
			<ScrollView contentContainerStyle={{ flex: 1 }}>
				<View style={{ flex: 0.16 }}>
					<RadioGroup
						options={catalogVisitas.map((catalog) => ({
							id: catalog.id,
							label: catalog.tipo_visita,
							icon: TipoVisitasIcon[
								catalog.tipo_visita
							] as unknown as React.ReactNode,
						}))}
						handleChange={(value: string) => {
							console.log("TipoVisita", value);
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
