import React, { useEffect, useState } from "react";
import {
	FontAwesome,
	FontAwesome5,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
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

export const VisitaInfo = ({ navigation, route }: any) => {
	const { uniqueID } = route.params;
	const [showModal, setShowModal] = useState(false);
	const [showModalTime, setShowModalTime] = useState(false);
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
				<View
					style={{
						flex: 0.16,
						justifyContent: "center",
						alignItems: "center",
					}}>
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
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginBottom: 15,
					}}>
					<TextInput
						style={{
							width: "80%",
							height: 40,
							borderBottomColor: "gray",
							borderBottomWidth: 1,
						}}
						onFocus={() => {}}
						onBlur={() => {}}
						onChangeText={(text) => console.log("nombre visita", text)}
						autoCapitalize='none'
						maxLength={50}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						backgroundColor: "red",
						marginBottom: 15,
						justifyContent: "space-around",
					}}>
					<View>
						<Text style={[{ paddingVertical: 5 }]}>Desde el:</Text>
						<Text style={[{ paddingVertical: 5 }]}>Hasta el:</Text>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<TouchableOpacity
							onPress={() => {
								setFormValues((prev) => ({ ...prev, dateType: "from" }));
								setShowModal(true);
							}}>
							<Text>
								{new Date(formValues["fromDate"]).toLocaleDateString(
									"es-MX",
									{}
								)}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setFormValues((prev) => ({ ...prev, dateType: "to" }));
								setShowModal(true);
							}}>
							<Text style={[{ paddingVertical: 5 }]}>
								{new Date(formValues["toDate"]).toLocaleDateString("es-MX", {})}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Text style={[{ paddingVertical: 5 }]}>a las</Text>
						<Text style={[{ paddingVertical: 5 }]}>a las</Text>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<TouchableOpacity
							style={{ paddingVertical: 5 }}
							onPress={() => {
								setFormValues((prev) => ({ ...prev, hourType: "from" }));
								setShowModalTime(true);
							}}>
							<Text>{`${formValues["fromHour"]}:00`}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ paddingVertical: 5 }}
							onPress={() => {
								setFormValues((prev) => ({ ...prev, hourType: "to" }));
								setShowModalTime(true);
							}}>
							<Text>{`${formValues["toHour"]}:00`}</Text>
						</TouchableOpacity>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Text style={{ paddingVertical: 5 }}>CST</Text>
						<Text style={{ paddingVertical: 5 }}>CST</Text>
					</View>
				</View>
				<View style={{ marginBottom: "5%" }}>
					<RadioGroup
						options={catalogIngreso.map((catalog) => ({
							id: catalog.id,
							label: catalog.tipo_ingreso,
							icon: TipoVisitasIcon[
								catalog.tipo_ingreso
							] as unknown as React.ReactNode,
						}))}
						handleChange={(value: string) => {
							setFormValues((prev) => ({ ...prev, tipo_ingreso: value }));
						}}
					/>
				</View>
				{formValues.tipo_ingreso === "1" && (
					<VehicleInfo
						handleData={(data: { [key: string]: string }) => {
							setFormValues((prev) => ({ ...prev, ...data }));
						}}
					/>
				)}
				<Text style={{ marginLeft: 10 }}>Registar acompanante</Text>
				<GuestPicker />
				<Switcher
					title='Entrada multiple:'
					value={formValues.multiple_entrada}
					handleOnChange={(value) => {
						setFormValues((prev) => ({ ...prev, multiple_entrada: value }));
					}}
				/>
				<Switcher
					title='Entrada multiple:'
					value={formValues.multiple_entrada}
					handleOnChange={(value) => {
						setFormValues((prev) => ({ ...prev, multiple_entrada: value }));
					}}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};
