import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { app_colors } from "@gcVigilantes/utils/default.colors";

export const CardTitle = ({
	title,
	editIcon,
	uppercase,
}: {
	title: string;
	editIcon?: boolean;
	uppercase?: boolean;
}) => {
	return (
		<View
			style={{
				borderColor: app_colors.ligth_bg,
				width: "100%",
				justifyContent: "flex-start",
				alignItems: "flex-start",
			}}>
			<Text
				style={{
					marginBottom: 10,
					marginLeft: 10,
					marginTop: 10,
					textAlign: "justify",
					fontSize: 14,
					fontWeight: "bold",
					color: app_colors.text_gray,
					textTransform: uppercase ? "uppercase" : "capitalize",
				}}>
				{title}
			</Text>
			{editIcon && <></>}
		</View>
	);
};

CardTitle.defaultProps = {
	uppercase: false,
};
