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
import { getTimeZone, toMilitarHours } from "@gcVigilantes/utils";
import { HourPicker } from "@gcVigilantes/Components/HourPicker/HourPicker";
import { SingleButton } from "@gcVigilantes/Components/SingleButton/SingleButton";
import { Picker } from "@react-native-picker/picker";

export const DateInfo = ({
  fechaIngreso,
  fechaSalida,
  horaIngreso,
  horaSalida,
  estatus,
  dateTypeInput,
  edit,
  handleOnChange,
}: DateInfoProps) => {
  const timeZone = new Date().getTimezoneOffset();
  const [startHour, setStartHour] = React.useState<string>(
    horaIngreso.substring(0, 5)
  );
  const [endHour, setEndHour] = React.useState<string>(
    horaSalida.substring(0, 5)
  );
  const [startHourAmPm, setStartHourAmPm] = React.useState<string>(
    horaIngreso.replaceAll(/[^a-zA-Z]/g, "")
  );
  const [endHourAmPm, setEndHourAmPm] = React.useState<string>(
    horaSalida.replaceAll(/[^a-zA-Z]/g, "")
  );
  const [hourPicker, setHourPicker] = React.useState<{
    type: "start" | "end";
    visible: boolean;
  }>({ type: "start", visible: false });
  const [formatPicker, setFormatPicker] = React.useState<{
    type: "start" | "end";
    visible: boolean;
  }>({ type: "start", visible: false });

  const openHourPicker = (type: "start" | "end") => {
    setHourPicker({ type, visible: true });
  };

  return (
    <>
      <View style={card_styles}>
        <CardTitle title="Vigencia" uppercase />
        <Calendar
          style={{ width: "100%" }}
          markedDates={{
            [fechaIngreso.toString().split("T")[0]]: {
              selected: true,
              selectedColor: app_colors.secondary_badge,
            },
            [fechaSalida.toString().split("T")[0]]: {
              selected: true,
              selectedColor: app_colors.red_inactive_invalid,
            },
          }}
          onDayPress={(day: any) => {
            if (edit) {
              switch (dateTypeInput) {
                case DATE_TYPES.START:
                  handleOnChange("dateTypeInput", DATE_TYPES.END);
                  handleOnChange(
                    "fechaIngreso",
                    `${day.dateString}T${toMilitarHours(
                      Number.parseInt(startHour),
                      startHourAmPm
                    )}`
                  );
                  break;
                case DATE_TYPES.END:
                  if (
                    new Date(day.dateString) <
                    new Date(fechaIngreso.split("T")[0])
                  ) {
                    return;
                  }
                  handleOnChange("dateTypeInput", DATE_TYPES.START);
                  handleOnChange(
                    "fechaSalida",
                    `${day.dateString}T${toMilitarHours(
                      Number.parseInt(endHour),
                      endHourAmPm
                    )}`
                  );
                  break;
                default:
                  break;
              }
            }
          }}
          shouldRasterizeIOS={true}
        />
      </View>
      <View style={card_styles}>
        <CardTitle title="Hora" uppercase />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <Text style={[app_text_body, { width: "20%" }]}>{`Ingreso: `}</Text>
          <TouchableOpacity onPress={() => estatus && openHourPicker("start")}>
            <Text
              style={{
                position: "relative",
                top: -10,
                fontSize: 28,
                color: app_colors.black,
                fontWeight: "bold",
              }}
            >
              {`${startHour}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFormatPicker({ type: "start", visible: true })}
          >
            <Text style={[app_text_title]}>{` ${startHourAmPm}`}</Text>
          </TouchableOpacity>
          <Text style={app_text_body}>{getTimeZone(timeZone)}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={[app_text_body, { width: "20%" }]}>{`Salida: `}</Text>
          <TouchableOpacity onPress={() => estatus && openHourPicker("end")}>
            <Text
              style={{
                fontSize: 28,
                color: app_colors.black,
                fontWeight: "bold",
                top: -5,
              }}
            >
              {`${endHour}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFormatPicker({ type: "end", visible: true })}
          >
            <Text style={app_text_title}>{` ${endHourAmPm}`}</Text>
          </TouchableOpacity>
          <Text style={app_text_body}>{getTimeZone(timeZone)}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={hourPicker.visible}
      >
        <View>
          <HourPicker
            totalHours={24}
            currValue={hourPicker.type === "start" ? startHour : endHour}
            handleChange={(value: string) => {
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
            label="Aceptar"
            onPress={() => setHourPicker({ type: "start", visible: false })}
          />
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={false}
        visible={formatPicker.visible}
      >
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
          }}
        >
          {["AM", "PM"].map((value, index) => (
            <Picker.Item key={index} label={value} value={value} />
          ))}
        </Picker>
        <SingleButton
          label="Aceptar"
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
