import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

type HourPickerProps = {
  totalHours: number;
  currValue: string;
  handleChange: (_v: string) => void;
};

export const HourPicker = ({
  totalHours,
  currValue,
  handleChange,
}: HourPickerProps) => {
  const [current, setCurrValue] = React.useState<string>(currValue);

  const onChange = (value: string) => {
    setCurrValue(value);
    handleChange(value);
  };
  let tracker = 0;
  return (
    <View>
      <Picker selectedValue={current} onValueChange={onChange}>
        {new Array(totalHours).fill(0).map((_, index) => {
          if (index % 2 === 0) {
            tracker++;
          }
          return (
            <Picker.Item
              key={index}
              label={`${tracker < 10 ? "0" : ""}${tracker}:${
                index % 2 === 0 ? "00" : "30"
              }`}
              value={`${tracker < 10 ? "0" : ""}${tracker}:${
                index % 2 === 0 ? "00" : "30"
              }`}
            />
          );
        })}
      </Picker>
    </View>
  );
};
