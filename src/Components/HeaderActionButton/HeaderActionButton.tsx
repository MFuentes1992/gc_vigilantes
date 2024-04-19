import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { headerActionStyles } from "./styles/default.styles";
import { HeaderActionButtonProps } from "./types";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const HeaderActionButton = (props: HeaderActionButtonProps) => {
	return (
		<TouchableOpacity
			style={[headerActionStyles, { backgroundColor: props.color }]}
			onPress={props.onPress}>
			<View>
				<FontAwesome5 name={props.icon} size={18} color={app_colors.white} />
			</View>
		</TouchableOpacity>
	);
};

HeaderActionButton.defaultProps = {
	color: app_colors.secondary,
};
