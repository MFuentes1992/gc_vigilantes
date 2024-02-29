import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {
	VisitaDetailsProps,
	details_badge,
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

export const VisitaDetails = ({
	uri,
	autor,
	estatus,
	direccion,
	notificaciones,
	handleNotificaciones,
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
						<View style={details_badge}>
							<Text style={details_badge_text}>{estatus}</Text>
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
				<TouchableOpacity>
					<Text style={app_text_menu}>Resumen</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={app_text_menu}>Fechas</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={app_text_menu}>Ajustes</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};
