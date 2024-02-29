import React from "react";
import { View, Image, Text } from "react-native";
import {
	VisitaDetailsProps,
	details_badge,
	details_badge_text,
	details_container,
	details_info,
} from "./constants";
import { app_text_body } from "@gcVigilantes/utils/default.styles";

export const VisitaDetails = ({
	uri,
	autor,
	estatus,
	direccion,
}: VisitaDetailsProps) => {
	return (
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
				<View style={details_badge}>
					<Text style={details_badge_text}>{estatus}</Text>
				</View>
			</View>
		</View>
	);
};
