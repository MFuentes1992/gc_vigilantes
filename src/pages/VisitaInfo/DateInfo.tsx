import React, { useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, Modal } from "react-native";
import { DATE_TYPES, DateInfoProps, card_styles } from "./constants";
import { Calendar } from "react-native-calendars";
import { CardTitle } from "@gcVigilantes/Components/CardTitle/CardTitle";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import {
	app_text_body,
	app_text_title,
} from "@gcVigilantes/utils/default.styles";
import {
	getTimeZone,
	militarToTwelveHours,
	timeFormat,
	toMilitarHours,
} from "@gcVigilantes/utils";
import { HourPicker } from "@gcVigilantes/Components/HourPicker/HourPicker";
import { SingleButton } from "@gcVigilantes/Components/SingleButton/SingleButton";
import { Picker } from "@react-native-picker/picker";

export const DateInfo = ({
	fromDate,
	toDate,
	fromHour,
	toHour,
	handleOnChange,
}: DateInfoProps) => {
	const timeZone = new Date().getTimezoneOffset();
	const [dateEdit, setDateEdit] = React.useState<boolean>(false);
	const [startDate, setStartDate] = React.useState<string>(
		fromDate?.split("T")[0] || ""
	);
	const [endDate, setEndDate] = React.useState<string>(
		toDate?.split("T")[0] || ""
	);
	const [startHour, setStartHour] = React.useState<number>(
		militarToTwelveHours(Number.parseInt(`${fromHour}`, 10) || 0).hour
	);
	const [endHour, setEndHour] = React.useState<number>(
		militarToTwelveHours(Number.parseInt(`${toHour}`, 10) || 0).hour
	);
	const [startHourAmPm, setStartHourAmPm] = React.useState<string>(
		militarToTwelveHours(Number.parseInt(`${fromHour}`, 10) || 0).ampm
	);
	const [endHourAmPm, setEndHourAmPm] = React.useState<string>(
		militarToTwelveHours(Number.parseInt(`${toHour}`, 10) || 0).ampm
	);
	const [dateType, setDateType] = React.useState<number>(DATE_TYPES.START);
	const [dateRange, setDateRange] = React.useState<{ [key: string]: any }>({});
	const [hourPicker, setHourPicker] = React.useState<{
		type: "start" | "end";
		visible: boolean;
	}>({ type: "start", visible: false });
	const [formatPicker, setFormatPicker] = React.useState<{
		type: "start" | "end";
		visible: boolean;
	}>({ type: "start", visible: false });

	useEffect(() => {
		if (startDate !== "" && endDate !== "") {
			const diffDays = Math.abs(
				new Date(endDate || "").getDate() - new Date(startDate || "").getDate()
			);
			let tmp = {} as any;
			new Array(diffDays).fill(0).forEach((_, index) => {
				const year = new Date(startDate || "").getFullYear();
				const month = new Date(startDate || "").getMonth() + 1;
				const day = new Date(startDate || "").getDate() + index + 1;
				tmp[
					`${new Date(`${year}-${month}-${day}`).toISOString().split("T")[0]}`
				] = {
					startingDay: index === 0,
					endingDay: false,
					color:
						index === 0 ? app_colors.calendar_active : app_colors.calendar_pale,
					textColor: app_colors.white,
				};
			});
			tmp[`${endDate}`] = {
				startingDay: false,
				endingDay: true,
				color: app_colors.calendar_active,
				textColor: app_colors.white,
			};
			setDateRange(tmp);
			handleOnChange("fromDate", startDate);
			handleOnChange("toDate", endDate);
		}
	}, [startDate, endDate]);

	useEffect(() => {
		handleOnChange(
			"fromHour",
			`${
				toMilitarHours(Number.parseInt(`${startHour}`, 10), startHourAmPm) < 10
					? `0${toMilitarHours(
							Number.parseInt(`${startHour}`, 10),
							startHourAmPm
					  )}`
					: toMilitarHours(Number.parseInt(`${startHour}`, 10), startHourAmPm)
			}`
		);
		handleOnChange(
			"toHour",
			`${
				toMilitarHours(Number.parseInt(`${endHour}`, 10), endHourAmPm) < 10
					? `0${toMilitarHours(Number.parseInt(`${endHour}`, 10), endHourAmPm)}`
					: toMilitarHours(Number.parseInt(`${endHour}`, 10), endHourAmPm)
			}`
		);
	}, [startHour, endHour, startHourAmPm, endHourAmPm]);

	const openHourPicker = (type: "start" | "end") => {
		setHourPicker({ type, visible: true });
	};

	return (
		<>
			<View style={card_styles}>
				<CardTitle
					title='Vigencia'
					uppercase
					editIcon
					handleEdit={() => {
						Alert.alert("Fecha de vigencia", "¿Cual fecha deseas editar?", [
							{
								text: "Cancelar",
								onPress: () => console.log("Cancel Pressed"),
								style: "cancel",
							},
							{
								text: "Inicio",
								onPress: () => {
									setDateType(DATE_TYPES.START);
								},
							},
							{
								text: "Fin",
								onPress: () => {
									setDateType(DATE_TYPES.END);
								},
							},
						]);
						setDateEdit(true);
					}}
				/>
				<Calendar
					style={{ width: "100%" }}
					markingType='period'
					markedDates={{
						...dateRange,
					}}
					onDayPress={(day) => {
						if (dateType === DATE_TYPES.START && dateEdit) {
							setStartDate(`${day.dateString}`);
							const year = new Date(day.dateString).getFullYear();
							const month = new Date(day.dateString).getMonth() + 1;
							const currDay = new Date(day.dateString).getDate() + 2;
							setEndDate(`${year}-${month}-${currDay}`);
							setDateEdit(false);
						} else if (dateType === DATE_TYPES.END && dateEdit) {
							if (new Date(day.dateString) < new Date(startDate)) {
								Alert.alert(
									"Error",
									"La fecha de fin no puede ser menor a la de inicio"
								);
								return;
							}
							setEndDate(`${day.dateString}`);
							setDateEdit(false);
						}
					}}
					current={startDate.split("T")[0]}
					minDate={fromDate?.split("T")[0]}
					shouldRasterizeIOS={true}
				/>
			</View>
			<View style={card_styles}>
				<CardTitle title='Hora' uppercase />
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						justifyContent: "space-around",
					}}>
					<Text style={[app_text_body, { width: "20%" }]}>{`Ingreso: `}</Text>
					<TouchableOpacity onPress={() => openHourPicker("start")}>
						<Text
							style={{
								fontSize: 28,
								color: app_colors.black,
								fontWeight: "bold",
							}}>
							{`${startHour}:00`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setFormatPicker({ type: "start", visible: true })}>
						<Text style={app_text_title}>{` ${startHourAmPm}`}</Text>
					</TouchableOpacity>
					<Text style={app_text_body}>{getTimeZone(timeZone)}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						alignItems: "center",
						justifyContent: "space-around",
					}}>
					<Text style={[app_text_body, { width: "20%" }]}>{`Salida: `}</Text>
					<TouchableOpacity onPress={() => openHourPicker("end")}>
						<Text
							style={{
								fontSize: 28,
								color: app_colors.black,
								fontWeight: "bold",
							}}>
							{`${endHour}:00`}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setFormatPicker({ type: "end", visible: true })}>
						<Text style={app_text_title}>{` ${endHourAmPm}`}</Text>
					</TouchableOpacity>
					<Text style={app_text_body}>{getTimeZone(timeZone)}</Text>
				</View>
			</View>
			<Modal
				animationType='slide'
				transparent={false}
				visible={hourPicker.visible}>
				<View>
					<HourPicker
						totalHours={12}
						currValue={hourPicker.type === "start" ? startHour : endHour}
						handleChange={(value: number) => {
							switch (hourPicker.type) {
								case "start":
									setStartHour(value);
									break;
								case "end":
									setEndHour(value);
									break;
								default:
									break;
							}
						}}
					/>
					<SingleButton
						label='Aceptar'
						onPress={() => setHourPicker({ type: "start", visible: false })}
					/>
				</View>
			</Modal>
			<Modal
				animationType='slide'
				transparent={false}
				visible={formatPicker.visible}>
				<Picker
					selectedValue={
						formatPicker.type === "start" ? startHourAmPm : endHourAmPm
					}
					onValueChange={(value: string) => {
						switch (formatPicker.type) {
							case "start":
								setStartHourAmPm(value);
								break;
							case "end":
								setEndHourAmPm(value);
								break;
							default:
								break;
						}
					}}>
					{["AM", "PM"].map((value, index) => (
						<Picker.Item key={index} label={value} value={value} />
					))}
				</Picker>
				<SingleButton
					label='Aceptar'
					onPress={() => setFormatPicker({ type: "start", visible: false })}
				/>
			</Modal>
		</>
	);
};

DateInfo.defaultProps = {
	fromDate: new Date().toLocaleDateString("en-US"),
	toDate: new Date().toLocaleDateString("en-US"),
	fromHour: new Date().getHours(),
	toHour: new Date().getHours(),
};
