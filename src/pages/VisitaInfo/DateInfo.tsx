import React from "react";
import { View, Text } from "react-native";
import { DateInfoProps, card_styles } from "./constants";
import { Calendar } from "react-native-calendars";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { app_text_body } from "@gcVigilantes/utils/default.styles";
import { getTimeZone, timeFormat } from "@gcVigilantes/utils";

export const DateInfo = ({
	fromDate,
	toDate,
	fromHour,
	toHour,
}: DateInfoProps) => {
	const timeZone = new Date().getTimezoneOffset();
	const [startDate, setStartDate] = React.useState(fromDate?.split("T")[0]);
	const [endDate, setEndate] = React.useState(toDate?.split("T")[0]);
	return (
		<>
			<View style={card_styles}>
				<CardTitle title='Vigencia' uppercase />
				<Calendar
					style={{ width: "100%" }}
					markingType='period'
					markedDates={{
						[`${startDate}`]: {
							startingDay: true,
							endingDay: true,
							color: app_colors.secondary,
							textColor: app_colors.white,
							selected: true,
						},
						[`${endDate}`]: {
							startingDay: true,
							endingDay: true,
							color: app_colors.secondary,
							textColor: app_colors.white,
							selected: true,
						},
					}}
					onDayPress={(day) => {
						console.log(day.dateString);
					}}
					shouldRasterizeIOS={true}
				/>
			</View>
			<View style={card_styles}>
				<CardTitle title='Hora' uppercase />
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						alignItems: "center",
						justifyContent: "space-around",
					}}>
					<Text style={app_text_body}>{`Ingreso: `}</Text>
					<Text
						style={{
							fontSize: 28,
							color: app_colors.black,
							fontWeight: "bold",
						}}>
						{fromDate?.split("T")[1].substring(0, 4)}
					</Text>
					<Text style={app_text_body}>{getTimeZone(timeZone)}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						alignItems: "center",
						justifyContent: "space-around",
					}}>
					<Text style={app_text_body}>{`Salida: `}</Text>
					<Text
						style={{
							fontSize: 28,
							color: app_colors.black,
							fontWeight: "bold",
						}}>
						{toDate?.split("T")[1].substring(0, 4)}
					</Text>
					<Text style={app_text_body}>{getTimeZone(timeZone)}</Text>
				</View>
			</View>
		</>
	);
};

DateInfo.defaultProps = {
	fromDate: new Date().toLocaleDateString("en-US"),
	toDate: new Date().toLocaleDateString("en-US"),
	fromHour: new Date().getHours(),
	toHour: new Date().getHours(),
};
