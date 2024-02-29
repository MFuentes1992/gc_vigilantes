import { app_colors } from "@gcVigilantes/utils/default.colors";
import React from "react";
import { View, Text } from "react-native";

export const CardTitle = ({
	title,
	uppercase,
}: {
	title: string;
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
		</View>
	);
};

CardTitle.defaultProps = {
	uppercase: false,
};
