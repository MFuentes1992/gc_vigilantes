import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {
	VisitaDetailsProps,
	details_badge_active,
	details_badge_inactive,
	details_badge_text,
	details_container,
	details_info,
	details_menu,
} from "./constants";
import {
	app_text_body,
	app_text_menu,
} from "@gcVigilantes/utils/default.styles";
import { Switcher } from "@gcVigilantes/Components/Switcher/Switcher";
import { TABS } from "@gcVigilantes/pages/VisitaInfo/constants";

export const VisitaDetails = ({
	uri,
	autor,
	estatus,
	direccion,
	notificaciones,
	handleNotificaciones,
	handleChangeTab,
}: VisitaDetailsProps) => {
	return (
		<>
			<View style={details_container}>
				<Image
					width={64}
					height={64}
					source={{
						uri: uri,
					}}
				/>
				<View style={details_info}>
					<Text style={app_text_body}>{autor}</Text>
					<Text style={app_text_body}>{direccion}</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							width: "100%",
						}}>
						<View
							style={estatus ? details_badge_active : details_badge_inactive}>
							<Text style={details_badge_text}>
								{estatus ? "Activa" : "Inactiva"}
							</Text>
						</View>
						<View>
							<Switcher
								title='Alertas'
								value={notificaciones}
								handleOnChange={handleNotificaciones}
							/>
						</View>
					</View>
				</View>
			</View>
			<View style={details_menu}>
				<TouchableOpacity onPress={() => handleChangeTab(TABS.MAIN)}>
					<Text style={app_text_menu}>Resumen</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleChangeTab(TABS.DATE)}>
					<Text style={app_text_menu}>Fechas</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleChangeTab(TABS.GUEST)}>
					<Text style={app_text_menu}>Invitados</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handleChangeTab(TABS.SETTINGS)}>
					<Text style={app_text_menu}>Ajustes</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};
