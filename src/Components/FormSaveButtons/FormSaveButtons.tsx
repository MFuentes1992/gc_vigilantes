import { app_colors } from "@gcVigilantes/utils/default.colors";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { save_buttons } from "./constants";

type FormSaveButtonsProps = {
  onCancel: () => void;
  onSave: () => void;
  saveText: string;
  cancelText: string;
};

export const FormSaveButtons = ({
  onSave,
  onCancel,
  saveText,
  cancelText,
}: FormSaveButtonsProps) => {
  return (
    <View style={save_buttons}>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: app_colors.primary,
          width: "40%",
          maxHeight: 40,
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={onCancel}
      >
        <Text style={{ color: app_colors.primary }}>{cancelText}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: app_colors.primary,
          padding: 10,
          borderRadius: 5,
          width: "40%",
          maxHeight: 40,
          alignItems: "center",
          marginBottom: 10,
        }}
        onPress={onSave}
      >
        <Text style={{ color: app_colors.white }}>{saveText}</Text>
      </TouchableOpacity>
    </View>
  );
};
