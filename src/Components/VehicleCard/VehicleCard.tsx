import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Image, Text } from "react-native-animatable";
import { TouchableOpacity } from "react-native";
import { app_text_body } from "@gcVigilantes/utils/default.styles";
import {
	VehicleCardProp,
	vehicleCardEditStyles,
	vehicleCardStyles,
	vehicleImageStyles,
} from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const VehicleCard = ({ id, vehicle, openModal }: VehicleCardProp) => {
	return (
		<View style={vehicleCardStyles}>
			<View style={vehicleCardEditStyles}>
				<TouchableOpacity onPress={() => openModal(id)}>
					<FontAwesome5 name='edit' size={16} color={app_colors.text_gray} />
				</TouchableOpacity>
				<FontAwesome5 name='times' size={16} color={app_colors.text_gray} />
			</View>
			<View style={{ flexDirection: "row", width: "100%" }}>
				<View style={vehicleImageStyles}>
					<Image
						width={40}
						height={40}
						style={{ width: 40, height: 40, resizeMode: "contain" }}
						source={require("assets/topView.png")}
					/>
				</View>
				<View style={{ width: "70%", padding: "5%" }}>
					<Text
						style={app_text_body}>{`${vehicle.marca} ${vehicle.modelo}`}</Text>
					<Text style={app_text_body}>
						{`${vehicle.color} / ${vehicle.anio}`}
					</Text>
					<Text style={[app_text_body, { fontWeight: "bold" }]}>
						{vehicle.placas}
					</Text>
				</View>
			</View>
		</View>
	);
};
